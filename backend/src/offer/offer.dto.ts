import {IsNumber, IsOptional, IsString, Length} from 'class-validator';
import { Exclude } from 'class-transformer';
import { User } from '../users/user.entity';

export class OfferDto {
  @IsString()
  title!: string;

  @IsString()
  @Length(0, 1000 )
  description!: string;

  @IsString()
  city!: string;

  @IsNumber()
  categoryId!: number;

  @Exclude()
  author!: User;

  @IsOptional()
  @IsNumber()
  money!: number;

  @IsOptional()
  @IsString()
  image!: string;
}
