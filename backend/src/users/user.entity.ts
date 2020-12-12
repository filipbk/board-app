import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Provider } from '../auth/provider';
import { Role } from '../auth/role';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Offer } from '../offer/offer.entity';

@Entity()
export class User extends BaseEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsOptional()
  id!: number;

  @Column({ length: 255 })
  @IsString()
  email!: string;

  @Column({ length: 255, nullable: true })
  @IsString()
  firstName?: string;

  @Column({ length: 255, nullable: true })
  @IsString()
  lastName?: string;

  @OneToMany(
    () => Offer,
    offer => offer.author,
    { cascade: ['insert', 'update'] },
  )
  offers!: Offer[];

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
  @Column({ default: Role.USER })
  role!: Role;
}
