import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CitaMedica } from '../citas-medicas/citas-medicas.entity';

@Entity('pacientes')
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  patientId: string;

  @Column({ length: 90 })
  firstName: string;

  @Column({ length: 90 })
  lastName: string;

  @Column({ length: 200 })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 200 })
  address: string;

  @Column({ length: 90 })
  city: string;

  @OneToMany(() => CitaMedica, citaMedica => citaMedica.paciente)
  citas: CitaMedica[];

}