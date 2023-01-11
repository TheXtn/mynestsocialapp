import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
export class CreateItemDto {
  @IsString() @MinLength(5) @ApiProperty() title: string;
  @IsNotEmpty() @ApiProperty() desc: string;
  authorEmail: string;
}
