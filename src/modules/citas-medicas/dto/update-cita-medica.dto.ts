import { IsOptional, IsNumber, IsDateString, IsString } from 'class-validator';

export class UpdateCitaMedicaDto {
  @IsOptional()
  @IsNumber()
  medicoId?: number;

  @IsOptional()
  @IsDateString()
  fechaHora?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
