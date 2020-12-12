import { Exclude, Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Provider } from '../auth/provider';
import { Role } from '../auth/role';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Offer } from '../offer/offer.entity';
import { Base } from '../base-entity';

@Entity()
export class User extends Base {
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

  @Column({ default: false })
  enabled!: boolean;

  @Expose({ groups: [Role.ADMIN] })
  @Column({ default: Role.USER })
  role!: Role;
}
