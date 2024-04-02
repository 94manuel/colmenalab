import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { CitaMedica } from '../citas-medicas/citas-medicas.entity';
import { Medicamento } from '../medicamentos/medicamentos.entity';

@Entity()
export class OrdenMedica {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CitaMedica, citaMedica => citaMedica.ordenesMedicas)
  citaMedica: CitaMedica;

  @ManyToMany(() => Medicamento)
  @JoinTable()
  medicamentos: Medicamento[];

  @Column()
  descripcion: string;

  @Column()
  fechaCaducidad: Date;

  @Column()
  especialidad: string;
}
