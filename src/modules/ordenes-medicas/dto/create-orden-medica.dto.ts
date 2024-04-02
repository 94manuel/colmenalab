import { IsInt, IsNotEmpty, IsString, IsDate, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

export class CreateOrdenMedicaDto {
  @IsInt()
  @IsNotEmpty()
  citaMedicaId: number;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsDate()
  @IsNotEmpty()
  fechaCaducidad: Date;

  @IsString()
  @IsNotEmpty()
  especialidad: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  medicamentoIds: number[];
}
