import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MedicamentosService } from '../service/medicamentos.service';
import { CreateMedicamentoDto } from '../dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from '../dto/update-medicamento.dto';
import { Medicamento } from '../medicamentos.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('medicamentos')
export class MedicamentosController {
  constructor(private readonly medicamentosService: MedicamentosService) {}

  //@UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() createMedicamentoDto: CreateMedicamentoDto): Promise<Medicamento> {
    return this.medicamentosService.create(createMedicamentoDto);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<Medicamento[]> {
    return this.medicamentosService.findAll();
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Medicamento> {
    return this.medicamentosService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async update(@Param('id') id: number, @Body() updateMedicamentoDto: UpdateMedicamentoDto): Promise<Medicamento> {
    return this.medicamentosService.update(id, updateMedicamentoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.medicamentosService.remove(id);
  }

}
