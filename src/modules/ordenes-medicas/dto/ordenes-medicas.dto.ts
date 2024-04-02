import { IsNotEmpty, IsString, IsDate, IsInt } from 'class-validator';

export class CreateOrdenMedicaDto {
  @IsNotEmpty()
  @IsInt()
  citaMedicaId: number; // ID de la cita médica a la que pertenece la orden médica

  @IsNotEmpty()
  @IsString()
  descripcion: string; // Descripción de la orden médica

  @IsNotEmpty()
  @IsDate()
  fechaCaducidad: Date; // Fecha de caducidad de la orden médica

  @IsNotEmpty()
  @IsString()
  especialidad: string; // Especialidad médica de la orden
}
