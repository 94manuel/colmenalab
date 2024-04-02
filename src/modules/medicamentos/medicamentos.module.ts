import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentosService } from './service/medicamentos.service';
import { MedicamentosController } from './controller/medicamentos.controller';
import { Medicamento } from './medicamentos.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Medicamento])],
    controllers: [MedicamentosController],
    providers: [MedicamentosService],
    exports: [MedicamentosService],
})
export class MedicamentosModule { }
