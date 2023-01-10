/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class LoginUserDto {
  @IsEmail() @ApiProperty() email: string;
  @ApiProperty() @IsNotEmpty() @MinLength(5) password: string;
}
