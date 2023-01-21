import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class CreateLikeDto {
  @ApiProperty() @Length(12) originItemId: string;
  likerEmail: string;
}
