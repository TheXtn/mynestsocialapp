import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}
  create(createItemDto: CreateItemDto) {
    return this.prisma.item.create({
      data: {
        title: createItemDto.title,
        desc: createItemDto.desc,
        author: {
          connect: { email: createItemDto.authorEmail },
        },
      },
    });
  }

  findAll() {
    return this.prisma.item.findMany();
  }

  findOne(id: string) {
    const item = this.prisma.item.findUnique({
      where: {
        id,
      },
    });
    if (!item) {
      return new NotFoundException('Item not exist');
    }
    return item;
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    return this.prisma.item.update({
      data: updateItemDto,
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.item.delete({
      where: {
        id,
      },
    });
  }
}
