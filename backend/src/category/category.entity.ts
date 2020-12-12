import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Base } from '../base-entity';

@Entity()
export class Category extends Base {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsOptional()
  id!: number;

  @Column({ length: 255 })
  @IsString()
  imageUrl!: string;

  @Column({ length: 255 })
  @IsString()
  name!: string;
}
