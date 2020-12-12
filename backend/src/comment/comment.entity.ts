import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../base-entity';
import { IsNumber, IsOptional } from 'class-validator';
import { User } from '../users/user.entity';
import { Offer } from '../offer/offer.entity';

@Entity()
export class Comment extends Base {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsOptional()
  id!: number;

  @Column({ length: 999 })
  content!: string;

  @ManyToOne(
    () => User,
    user => user.comments,
  )
  author!: User;

  @ManyToOne(
    () => User,
    user => user.comments,
  )
  toWho!: User;

  @ManyToOne(
    () => Offer,
    offer => offer.comments,
    { onDelete: 'CASCADE' },
  )
  offer!: Offer;
}
