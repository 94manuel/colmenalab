import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { PacientesService } from '../service/pacientes.service';
import { CreatePacienteDto } from '../dto/create-paciente.dto';
import { UpdatePacienteDto } from '../dto/update-paciente.dto';
import { Paciente } from '../paciente.entity';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @HttpCode(200)
  async create(@Body() createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    return this.pacientesService.create(createPacienteDto);
  }

  @Get()
  async findAll(): Promise<Paciente[]> {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Paciente> {
    return this.pacientesService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async update(@Param('id') id: string, @Body() updatePacienteDto: UpdatePacienteDto): Promise<Paciente> {
    return this.pacientesService.update(id, updatePacienteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.pacientesService.remove(id);
  }
  
}
