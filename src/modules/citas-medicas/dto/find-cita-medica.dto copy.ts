import { IsOptional, IsNumber, IsDateString, IsString } from 'class-validator';

export class FindCitaMedicoDto {
  @IsOptional()
  @IsNumber()
  professionalCard?: string;

  @IsOptional()
  @IsDateString()
  fechaHora?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
