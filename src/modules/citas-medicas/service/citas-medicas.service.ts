import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CitaMedica } from '../citas-medicas.entity';
import { CreateCitaMedicaDto } from '../dto/create-cita-medica.dto';
import { UpdateCitaMedicaDto } from '../dto/update-cita-medica.dto';
import { Paciente } from '../../pacientes/paciente.entity';
import { Medico } from '../../medicos/medico.entity';

@Injectable()
export class CitasMedicasService {
    constructor(
        @InjectRepository(Medico)
        private readonly medicoRepository: Repository<Medico>,
        @InjectRepository(Paciente)
        private readonly pacienteRepository: Repository<Paciente>,
        @InjectRepository(CitaMedica)
        private readonly citaMedicaRepository: Repository<CitaMedica>,
    ) { }

    async create(createCitaMedicaDto: CreateCitaMedicaDto): Promise<CitaMedica> {
        const medico = await this.medicoRepository.findOne({ where: { id: createCitaMedicaDto.medicoId } });
        const paciente = await this.pacienteRepository.findOne({ where: { id: createCitaMedicaDto.patientId } });
        const fechaCita = new Date(createCitaMedicaDto.fechaHora);
        fechaCita.setHours(0, 0, 0, 0); // Inicio del día
        const fechaFin = new Date(fechaCita);
        fechaFin.setDate(fechaCita.getDate() + 1); // Siguiente día

        if (!medico) {
            throw new HttpException('Médico no encontrado', HttpStatus.BAD_REQUEST);
        }
    
        if (!paciente) {
            throw new HttpException('Paciente no encontrado', HttpStatus.BAD_REQUEST);
        }

        const existingCita = await this.citaMedicaRepository.findOne({
            where: {
                medico: { id: medico.id },
                fechaHora: Between(fechaCita, fechaFin),
            },
        });

        if (existingCita) {
            throw new ConflictException('El médico ya tiene una cita programada para este día.');
        }

        const citaMedica = new CitaMedica();

        citaMedica.medico = medico;
        citaMedica.paciente = paciente;
        citaMedica.fechaHora = createCitaMedicaDto.fechaHora;
        citaMedica.descripcion = createCitaMedicaDto.descripcion;

        return this.citaMedicaRepository.save(citaMedica);
    }


    async findAll(): Promise<CitaMedica[]> {
        return this.citaMedicaRepository.find();
    }

    async findOne(id: number): Promise<CitaMedica> {
        const citaMedica = await this.citaMedicaRepository.findOne({ where: { id: id } });
        if (!citaMedica) {
            throw new NotFoundException(`Cita médica con ID "${id}" no encontrada`);
        }
        return citaMedica;
    }

    async update(id: number, updateCitaMedicaDto: UpdateCitaMedicaDto): Promise<CitaMedica> {
        const citaMedica = await this.findOne(id);
        const updated = Object.assign(citaMedica, updateCitaMedicaDto);
        return this.citaMedicaRepository.save(updated);
    }

    async remove(id: number): Promise<void> {
        const citaMedica = await this.findOne(id);
        await this.citaMedicaRepository.remove(citaMedica);
    }

    async findByMedicoAndFecha(medicoId: number, fecha: string): Promise<CitaMedica[]> {
        const qb = this.citaMedicaRepository.createQueryBuilder('citaMedica');
        qb.where('citaMedica.medicoId = :medicoId', { medicoId })
            .andWhere('DATE(citaMedica.fechaHora) = DATE(:fecha)', { fecha });

        // Incluye relaciones si es necesario
        qb.leftJoinAndSelect('citaMedica.medico', 'medico');
        qb.leftJoinAndSelect('citaMedica.paciente', 'paciente');

        return qb.getMany();
    }

    async updateStatus(citaId: number, estado: string): Promise<CitaMedica> {
        const citaMedica = await this.citaMedicaRepository.findOne({ where: { id: citaId } });
        if (!citaMedica) {
            throw new NotFoundException(`Cita médica con ID "${citaId}" no encontrada`);
        }

        citaMedica.estado = estado;
        citaMedica.fechaActualizacionEstado = new Date();

        return this.citaMedicaRepository.save(citaMedica);
    }
}
