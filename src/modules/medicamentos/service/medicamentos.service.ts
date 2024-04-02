import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicamento } from '../medicamentos.entity';
import { CreateMedicamentoDto } from '../dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from '../dto/update-medicamento.dto';

@Injectable()
export class MedicamentosService {
  constructor(
    @InjectRepository(Medicamento)
    private readonly medicamentoRepository: Repository<Medicamento>,
  ) {}

  async create(createMedicamentoDto: CreateMedicamentoDto): Promise<Medicamento> {
    const medicamento = this.medicamentoRepository.create(createMedicamentoDto);
    return this.medicamentoRepository.save(medicamento);
  }

  async findAll(): Promise<Medicamento[]> {
    return this.medicamentoRepository.find();
  }

  async findOne(id: number): Promise<Medicamento> {
    const medicamento = await this.medicamentoRepository.findOne({where: { id: id }});
    if (!medicamento) {
      throw new NotFoundException(`Medicamento with ID "${id}" not found`);
    }
    return medicamento;
  }

  async update(id: number, updateMedicamentoDto: UpdateMedicamentoDto): Promise<Medicamento> {
    const medicamento = await this.findOne(id);
    const updated = Object.assign(medicamento, updateMedicamentoDto);
    return this.medicamentoRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const medicamento = await this.findOne(id); 
    await this.medicamentoRepository.remove(medicamento);
  }
}
