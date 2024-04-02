import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './medico.entity';
import { MedicosService } from './service/medicos.service';
import { MedicosController } from './controller/medicos.controller';
import { CitaMedica } from '../citas-medicas/citas-medicas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medico, CitaMedica])],
  providers: [MedicosService],
  controllers: [MedicosController],
})
export class MedicosModule {}
