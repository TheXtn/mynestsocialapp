import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(5) @ApiProperty() @IsNotEmpty() name: string;
  @IsEmail() @ApiProperty() email: string;
  @ApiProperty() @IsNotEmpty() @MinLength(5) password: string;
}
