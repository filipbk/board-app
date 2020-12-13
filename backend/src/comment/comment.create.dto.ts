import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CommentCreateDto {
  @IsNumber()
  @IsOptional()
  id!: number;

  @IsString()
  content!: string;

  @IsNumber()
  toWhoId!: number;

  @IsNumber()
  offerId!: number;
}
