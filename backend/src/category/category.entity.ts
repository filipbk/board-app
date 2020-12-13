import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Entity()
export class Category extends BaseEntity {
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
