import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsNumber()
  id!: number;

  @IsString()
  email!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  enabled!: boolean;
}
