/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private prisma:PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const item =await this.prisma.item.findUnique({
        where:{
            id:request.params.id
        }
    })
    if (!item){
       throw new NotFoundException('Item not found')
    }
    return user.id===item.authorId
}
}