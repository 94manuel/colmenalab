import { IsNotEmpty, IsString, IsEmail, MaxLength } from 'class-validator';

export class CreateMedicoDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  patientId?: string; // Considera cambiar el nombre de esta propiedad si no es un ID de paciente

  @IsNotEmpty()
  @IsString()
  @MaxLength(90)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(90)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(200)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  address: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(90)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  professionalCard: string;

  @IsNotEmpty()
  admissionDate: Date;
}
