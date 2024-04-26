import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Paciente {
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
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
