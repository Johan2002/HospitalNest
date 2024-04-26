import { Especialidad } from 'src/especialidad/entities/especialidad.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

@Entity()
export class Medico {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  Identificacion: number;
  @Column()
  Nombre: string;
  @Column()
  Apellido: string;
  @Column()
  Telefono: number;
  @Column()
  Correo: string;
  @ManyToOne(() => Especialidad, (especialidad) => especialidad.id, {
    // cascade: true,
    eager: true, // para que traiga las especialidad al hacer un findOne
  })
  @JoinColumn()
  especialidad: Especialidad;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
