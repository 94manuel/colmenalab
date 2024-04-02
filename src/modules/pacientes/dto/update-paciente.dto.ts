import { IsOptional, IsEmail, IsString, Length, IsDateString } from 'class-validator';

export class UpdatePacienteDto {
  @IsOptional()
  @IsString()
  @Length(1, 20)
  patientId?: string;

  @IsOptional()
  @IsString()
  @Length(1, 90)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 90)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  @Length(1, 90)
  city?: string;

}
