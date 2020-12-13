import { IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';
import { Role } from '../auth/role';

export class UserDto {
  @IsNumber()
  id!: number;

  @IsString()
  email!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsOptional()
  enabled!: boolean;

  @IsOptional()
  @IsEnum(Role)
  role!: Role;
}
