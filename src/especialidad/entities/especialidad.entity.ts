import { Medico } from 'src/medicos/entities/medico.entity';

import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Especialidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Medico, (medico) => medico.especialidad)
  medicos: Medico[];

  @DeleteDateColumn()
  deletedAt: Date;
}
