import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Provider } from '../auth/provider';
import { Role } from '../auth/role';

@Entity()
export class User extends BaseEntity {
  constructor(thirdPartyId: string, provider: Provider, email: string) {
    super();
    this.thirdPartyId = thirdPartyId;
    this.provider = provider;
    this.email = email;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  email!: string;

  @Column({ length: 255, nullable: true })
  firstName?: string;

  @Column({ length: 255, nullable: true })
  lastName?: string;

  @Exclude()
  @Column()
  thirdPartyId: string;

  @Exclude()
  @Column()
  provider: Provider;

  @Column()
  enabled = false;

  @Column({ type: 'simple-array' })
  roles: Role[] = [Role.USER];
}
