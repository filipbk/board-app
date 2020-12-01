import {IsNumber, IsOptional, IsString} from "class-validator";

export class UserDto {
    @IsNumber() @IsOptional() id!: number;
    @IsString() email!: string;
    @IsString() firstName?: string;
    @IsString() lastName?: string;
    enabled!: boolean;
}