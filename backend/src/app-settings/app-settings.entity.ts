import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../base-entity';

@Entity()
export class AppSettings extends Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  adminToken!: string;
}
