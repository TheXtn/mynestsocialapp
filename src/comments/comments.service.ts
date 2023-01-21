import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}
  async create(createCommentDto: CreateCommentDto) {
    return await this.prisma.comment.create({
      data: {
        body: createCommentDto.body,
        author: {
          connect: {
            email: createCommentDto.authorEmail,
          },
        },
        originItem: {
          connect: {
            id: createCommentDto.originItemId,
          },
        },
      },
    });
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: string) {
    return await this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}
