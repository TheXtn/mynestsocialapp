import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        password: false,
        name: true,
        email: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
        id: true,
        likes: true,
        items: true,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
