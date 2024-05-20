import {
  DeleteDateColumn,
  CreateDateColumn,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ nullable: false })
  password: string;
  @Column({ default: 'user' })
  rol: string;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
