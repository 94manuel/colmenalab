import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdenMedicaDto } from './create-orden-medica.dto';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateOrdenMedicaDto extends PartialType(CreateOrdenMedicaDto) {
    @IsArray()
    @IsOptional()
    medicamentoIds?: number[];
}
