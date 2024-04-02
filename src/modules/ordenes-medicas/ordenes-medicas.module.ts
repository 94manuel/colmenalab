// ordenes-medicas.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenMedica } from './ordenes-medicas.entity'; // Asegúrate de que la ruta sea correcta.
import { OrdenesMedicasService } from './service/ordenes-medicas.service';
import { OrdenesMedicasController } from './controller/ordenes-medicas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenMedica])],
  controllers: [OrdenesMedicasController],
  providers: [OrdenesMedicasService],
})
export class OrdenesMedicasModule {}
