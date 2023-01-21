import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}
  async create(createItemDto: CreateItemDto) {
    return await this.prisma.item.create({
      data: {
        title: createItemDto.title,
        desc: createItemDto.desc,
        author: {
          connect: { email: createItemDto.authorEmail },
        },
      },
    });
  }
  async findAll() {
    const items = await this.prisma.item.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return await items;
  }

  async findOne(id: string) {
    const item = await this.prisma.item.findUnique({
      where: {
        id,
      },
      include: {
        comments: {
          select: {
            id: true,
            body: true,
            createdAt: true,
            author: {
              select: {
                email: true,
                name: true,
              },
            },
          },
        },
        likes: {
          select: {
            id: true,
            createdAt: true,
            liker: {
              select: {
                email: true,
                name: true,
              },
            },
          },
        },
        author: {
          select: {
            email: true,
            id: true,
          },
        },
      },
    });
    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    return await this.prisma.item.update({
      data: updateItemDto,
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.item.delete({
      where: {
        id,
      },
    });
  }
}
