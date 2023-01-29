import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Me } from '../auth/guards/current-user.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { ItemNotFoundGuard } from '../items/guards/resource-not-found.guard';
import { CommentNotFoundGuard } from './guards/resource-not-found.guard';
import { RemoveGuard } from './guards/crud.guard';

@Controller('comments')
@UseGuards(JwtAuthGuard)
@ApiTags('Comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(ItemNotFoundGuard)
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Me() me: { email: string; id: string },
  ) {
    return this.commentsService.create({
      ...createCommentDto,
      authorEmail: me.email,
    });
  }

  @Delete(':id')
  @UseGuards(CommentNotFoundGuard)
  @UseGuards(RemoveGuard)
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
