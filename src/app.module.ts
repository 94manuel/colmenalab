import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesModule } from './modules/pacientes/paciente.module';
import { MedicosModule } from './modules/medicos/medico.module';
import { MedicamentosModule } from './modules/medicamentos/medicamentos.module';
import { CitaMedicaModule } from './modules/citas-medicas/citas-medicas.module';
import { OrdenesMedicasModule } from './modules/ordenes-medicas/ordenes-medicas.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgresdb',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'nestjs_db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true
    }),
    AuthModule,
    PacientesModule,
    MedicosModule,
    MedicamentosModule,
    CitaMedicaModule,
    OrdenesMedicasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
