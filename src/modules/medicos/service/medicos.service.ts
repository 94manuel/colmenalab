import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from '../medico.entity';
import { CreateMedicoDto } from '../dto/create-medico.dto';
import { UpdateMedicoDto } from '../dto/update-medico.dto';
import { CitaMedica } from '../../citas-medicas/citas-medicas.entity';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
    @InjectRepository(CitaMedica)
    private readonly citaMedicaRepository: Repository<CitaMedica>,
  ) {}

  async create(createMedicoDto: CreateMedicoDto): Promise<Medico> {
    const medico = this.medicoRepository.create(createMedicoDto);
    return this.medicoRepository.save(medico);
  }

  async findAll(): Promise<Medico[]> {
    return this.medicoRepository.find();
  }

  async findOne(id: string): Promise<Medico> {
    const medico = await this.medicoRepository.findOne({ where: { professionalCard: id } });
    if (!medico) {
      throw new NotFoundException(`Medico with ID "${id}" not found`);
    }
    return medico;
  }

  async update(id: string, updateMedicoDto: UpdateMedicoDto): Promise<Medico> {
    const medico = await this.findOne(id);  // Reutiliza findOne para manejar la excepción de no encontrado
    const updated = Object.assign(medico, updateMedicoDto);
    return this.medicoRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    const medico = await this.findOne(id);  // Reutiliza findOne para manejar la excepción de no encontrado
    await this.medicoRepository.remove(medico);
  }

  async findAvailableByDate(date: string): Promise<Medico[]> {
    
    const citas = await this.citaMedicaRepository
      .createQueryBuilder('cita')
      .leftJoinAndSelect('cita.medico', 'medico') 
      .where('DATE(cita.fechaHora) = DATE(:date)', { date })
      .getMany();
  
    const unavailableMedicoIds = citas
      .filter(cita => cita.medico != null)
      .map(cita => cita.medico.id);
  
    return this.medicoRepository
      .createQueryBuilder('medico')
      .where('medico.id NOT IN (:...ids)', { ids: unavailableMedicoIds.length > 0 ? unavailableMedicoIds : [-1] }) // Usa -1 o algún valor que se sepa que no será un ID válido si la lista está vacía
      .getMany();
  }
  
}
