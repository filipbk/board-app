import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../base-entity';

@Entity()
export class AppSettings extends Base {
  constructor(adminToken?: string) {
    super();
    this.adminToken = adminToken;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  adminToken?: string;
}
