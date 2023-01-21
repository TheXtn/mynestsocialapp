import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty() @IsString() body: string;
  authorEmail: string;
  @ApiProperty() @Length(12) originItemId: string;
}
