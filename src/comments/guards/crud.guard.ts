/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, CanActivate, Inject, ExecutionContext,ForbiddenException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RemoveGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let id = request.params.id;
    if(!id) id = request.body.id
    const comment=await this.prisma.comment.findFirst({where:{id}})
    if (comment){
        const item=await this.prisma.item.findFirst({where:{id:comment.originItemId}})
        if (comment.authorId!=request.user.id   ) {
            if (item.authorId!=request.user.id) throw new ForbiddenException()
        }
    }
   
    return true;
  }
}