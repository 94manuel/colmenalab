import { ArrayNotEmpty, IsArray, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateMedicamentoDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  enfermedades?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  medicamentoIds?: number[];
}
