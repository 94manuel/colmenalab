// ordenes-medicas.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrdenMedicaDto } from '../dto/create-orden-medica.dto';
import { UpdateOrdenMedicaDto } from '../dto/update-orden-medica.dto';
import { OrdenMedica } from '../ordenes-medicas.entity';

@Injectable()
export class OrdenesMedicasService {
  constructor(
    @InjectRepository(OrdenMedica)
    private readonly ordenMedicaRepository: Repository<OrdenMedica>,
  ) {}

  async create(createOrdenMedicaDto: CreateOrdenMedicaDto): Promise<OrdenMedica> {
    const ordenMedica = this.ordenMedicaRepository.create(createOrdenMedicaDto);
    return this.ordenMedicaRepository.save(ordenMedica);
  }

  async findAll(): Promise<OrdenMedica[]> {
    return this.ordenMedicaRepository.find({ relations: ['citaMedica'] });
  }
/*
  async findOne(id: number): Promise<OrdenMedica> {
    const ordenMedica = await this.ordenMedicaRepository.findOne(id, { relations: ['citaMedica'] });
    if (!ordenMedica) {
      throw new NotFoundException(`Orden médica con ID "${id}" no encontrada`);
    }
    return ordenMedica;
  }
*/
  async update(id: number, updateOrdenMedicaDto: UpdateOrdenMedicaDto): Promise<OrdenMedica> {
    const ordenMedica = await this.ordenMedicaRepository.preload({
      id: id,
      ...updateOrdenMedicaDto,
    });
    if (!ordenMedica) {
      throw new NotFoundException(`Orden médica con ID "${id}" no encontrada`);
    }
    return this.ordenMedicaRepository.save(ordenMedica);
  }
/*
  async remove(id: number): Promise<void> {
    const ordenMedica = await this.findOne(id);
    await this.ordenMedicaRepository.remove(ordenMedica);
  }
  */
}
