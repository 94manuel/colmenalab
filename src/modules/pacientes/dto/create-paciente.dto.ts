import { IsNotEmpty, IsEmail, IsString, Length, IsDateString } from 'class-validator';

export class CreatePacienteDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  patientId: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 90)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 90)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 90)
  city: string;

}
