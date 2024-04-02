import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Medico } from '../medicos/medico.entity';
import { Paciente } from '../pacientes/paciente.entity';
import { EstadoCita } from './dto/citas-medicas.types';
import { OrdenMedica } from '../ordenes-medicas/ordenes-medicas.entity';

@Entity()
export class CitaMedica {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Medico, medico => medico.citas)
  @JoinColumn({ name: 'medicoId' })
  medico: Medico;

  @ManyToOne(() => Paciente, paciente => paciente.citas)
  @JoinColumn({ name: 'pacienteId' })
  paciente: Paciente;

  @Column()
  fechaHora: Date;

  
  @Column({
    type: 'enum',
    enum: EstadoCita,
    default: EstadoCita.Programada,
  })
  estado: string; // Puedes usar un enum si tienes estados predefinidos

  @Column({ nullable: true })
  descripcion?: string;

  @OneToMany(() => OrdenMedica, ordenMedica => ordenMedica.citaMedica)
  ordenesMedicas: OrdenMedica[];

  @UpdateDateColumn({ nullable: true })
  fechaActualizacionEstado: Date;
}
