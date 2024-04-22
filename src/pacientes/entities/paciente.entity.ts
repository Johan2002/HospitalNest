import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
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
}
