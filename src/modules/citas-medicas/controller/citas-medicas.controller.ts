import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CitasMedicasService } from '../service/citas-medicas.service';
import { CreateCitaMedicaDto } from '../dto/create-cita-medica.dto';
import { UpdateCitaMedicaDto } from '../dto/update-cita-medica.dto';
import { CitaMedica } from '../citas-medicas.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('citas-medicas')
export class CitasMedicasController {
  constructor(private readonly citasMedicasService: CitasMedicasService) {}

  //@UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @HttpCode(200)
  async create(@Body() createCitaMedicaDto: CreateCitaMedicaDto): Promise<CitaMedica> {
    return this.citasMedicasService.create(createCitaMedicaDto);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<CitaMedica[]> {
    return this.citasMedicasService.findAll();
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CitaMedica> {
    return this.citasMedicasService.findOne(id);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async update(@Param('id') id: number, @Body() updateCitaMedicaDto: UpdateCitaMedicaDto): Promise<CitaMedica> {
    return this.citasMedicasService.update(id, updateCitaMedicaDto);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.citasMedicasService.remove(id);
  }

}
