import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateMedicoDto } from '../dto/create-medico.dto';
import { UpdateMedicoDto } from '../dto/update-medico.dto';
import { MedicosService } from '../service/medicos.service';
import { Medico } from '../medico.entity';

@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() createMedicoDto: CreateMedicoDto): Promise<Medico> {
    return this.medicosService.create(createMedicoDto);
  }
  
  @Get('disponibles')
  findAvailable(@Query('fecha') fecha: string) {
    return this.medicosService.findAvailableByDate(fecha);
  }

  @Get()
  async findAll(): Promise<Medico[]> {
    return this.medicosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Medico> {
    return this.medicosService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async update(@Param('id') id: string, @Body() updateMedicoDto: UpdateMedicoDto): Promise<Medico> {
    return this.medicosService.update(id, updateMedicoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.medicosService.remove(id);
  }
  
}
