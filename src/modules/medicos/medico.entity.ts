import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CitaMedica } from '../citas-medicas/citas-medicas.entity';

@Entity('medicos')
export class Medico {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    patientId: string;  // Considera cambiar el nombre de este campo si no se refiere al ID de paciente

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

    @OneToMany(() => CitaMedica, citaMedica => citaMedica.medico)
    citas: CitaMedica[];

    @Column({ length: 20, unique: true })
    professionalCard: string;

    @Column()
    admissionDate: Date;

}