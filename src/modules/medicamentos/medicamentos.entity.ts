import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('medicamentos')
export class Medicamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column('text')
  enfermedades: string;
}
