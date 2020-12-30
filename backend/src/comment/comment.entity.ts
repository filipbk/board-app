import { IsNumber, IsOptional } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../base-entity';
import { Offer } from '../offer/offer.entity';
import { User } from '../users/user.entity';

@Entity()
export class Comment extends Base {
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
