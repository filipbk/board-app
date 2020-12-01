import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Provider } from '../auth/provider';
import { Role } from '../auth/role';
import { IsString, IsNumber, IsOptional } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  @IsNumber() @IsOptional() id!: number;

  @Column({ length: 255 })
  @IsString() email!: string;

  @Column({ length: 255, nullable: true })
  @IsString() firstName?: string;

  @Column({ length: 255, nullable: true })
  @IsString() lastName?: string;

  @Exclude()
  @Column()
  thirdPartyId!: string;

  @Exclude()
  @Column()
  provider!: Provider;

  @Exclude()
  @Column({ default: false })
  enabled!: boolean;

  @Exclude()
  @Column({ type: 'simple-array' })
  roles!: Role[];
}
