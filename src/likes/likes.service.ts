import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ItemsService } from '../items/items.service';
import { BadRequestException } from '@nestjs/common/exceptions';
@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService, private items: ItemsService) {}
  async create(createLikeDto: CreateLikeDto) {
    const item = await this.items.findOne(createLikeDto.originItemId);
    if (item.author.email == createLikeDto.likerEmail) {
      throw new BadRequestException('You cant like your owning item');
    }
    return await this.prisma.like.create({
      data: {
        liker: {
          connect: { email: createLikeDto.likerEmail },
        },
        originItem: {
          connect: { id: createLikeDto.originItemId },
        },
      },
    });
  }
  async remove(id: string) {
    return await this.prisma.like.delete({
      where: {
        id,
      },
    });
  }
}
