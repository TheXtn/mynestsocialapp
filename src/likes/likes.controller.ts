import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { ApiTags } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from '../prisma-client-exception/prisma-client-exception.filter';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Me } from 'src/auth/guards/current-user.guard';
import { LikeNotFoundGuard } from './guards/resource-not-found.guard';
import { ItemNotFoundGuard } from 'src/items/guards/resource-not-found.guard';

@Controller('likes')
@ApiTags('Likes')
@UseFilters(PrismaClientExceptionFilter)
@UseGuards(JwtAuthGuard)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @UseGuards(ItemNotFoundGuard)
  create(
    @Body() createLikeDto: CreateLikeDto,
    @Me() me: { id: string; email: string },
  ) {
    return this.likesService.create({
      ...createLikeDto,
      likerEmail: me.email,
    });
  }
  @Delete(':id')
  @UseGuards(LikeNotFoundGuard)
  remove(@Param('id') id: string) {
    return this.likesService.remove(id);
  }
}
