import {BaseEntity, CreateDateColumn, UpdateDateColumn} from 'typeorm';

export class Base extends BaseEntity{
  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}
