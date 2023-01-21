import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseFilters,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaClientExceptionFilter } from '../prisma-client-exception/prisma-client-exception.filter';
import { ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Me } from '../auth/guards/current-user.guard';
import { OwnerGuard } from '../auth/guards/check-owner.guard';
import { ItemNotFoundGuard } from './guards/resource-not-found.guard';
@Controller('items')
@UseFilters(PrismaClientExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiTags('Items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(
    @Me() me: { id: string; email: string },
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.itemsService.create({
      ...createItemDto,
      authorEmail: me.email,
    });
  }
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }
  @Get(':id')
  @UseGuards(ItemNotFoundGuard)
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }
  @UseGuards(OwnerGuard)
  @UseGuards(ItemNotFoundGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }
  @UseGuards(OwnerGuard)
  @UseGuards(ItemNotFoundGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
