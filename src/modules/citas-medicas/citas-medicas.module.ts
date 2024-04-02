import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitaMedica } from './citas-medicas.entity';
import { CitasMedicasService } from './service/citas-medicas.service';
import { CitasMedicasController } from './controller/citas-medicas.controller';
import { Medico } from '../medicos/medico.entity';
import { Paciente } from '../pacientes/paciente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CitaMedica, Medico, Paciente])],
  controllers: [CitasMedicasController],
  providers: [CitasMedicasService],
})
export class CitaMedicaModule {}
