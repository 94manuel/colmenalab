import { IsOptional, IsString, IsEmail, MaxLength } from 'class-validator';

export class UpdateMedicoDto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  patientId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(90)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(90)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(200)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(90)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  professionalCard?: string;

  @IsOptional()
  admissionDate?: Date;
}
