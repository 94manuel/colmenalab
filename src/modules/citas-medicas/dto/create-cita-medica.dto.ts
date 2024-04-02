import { IsNotEmpty, IsNumber, IsDateString, IsOptional, IsString } from 'class-validator';
import { Medico } from 'src/modules/medicos/medico.entity';
import { Paciente } from 'src/modules/pacientes/paciente.entity';

export class CreateCitaMedicaDto {

  @IsNotEmpty()
  @IsNumber()
  medicoId?: number;

  @IsNotEmpty()
  @IsDateString()
  fechaHora: Date;

  @IsOptional()
  @IsString()
  descripcion?: string;
  
  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsNumber()
  professionalCard?: string;

  @IsOptional()
  @IsNumber()
  patientId?: number;
}
