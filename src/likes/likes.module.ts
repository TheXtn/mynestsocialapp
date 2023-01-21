import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemsService } from 'src/items/items.service';

@Module({
  controllers: [LikesController],
  providers: [LikesService, PrismaService, ItemsService],
})
export class LikesModule {}
