import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, VersionColumn} from 'typeorm';
import { IsNumber, IsOptional } from 'class-validator';
import { User } from '../users/user.entity';
import { Base } from '../base-entity';
import { Category } from '../category/category.entity';
import {Comment} from "../comment/comment.entity";

@Entity()
export class Offer extends Base {
  constructor(partial: Partial<Offer>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsOptional()
  id!: number;

  @Column({ length: 500 })
  title!: string;

  @Column({ length: 999 })
  description!: string;

  @Column({ length: 255 })
  city!: string;

  @ManyToOne(
    () => User,
    user => user.offers,
  )
  author!: User;

  @ManyToOne(() => Category)
  category!: Category;

  @OneToMany(
      () => Comment,
      comment => comment.offer,
      { cascade: ['insert', 'update'] },
  )
  comments!: Comment[];

  @Column({ nullable: true, default: 0 })
  @IsNumber()
  money!: number;

  @Column({ length: 999, nullable: true, default: 'unnamed.png' })
  image!: string;

  @VersionColumn() // A versioned entity!
  version!: number;
}
