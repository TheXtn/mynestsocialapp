/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, CanActivate, Inject, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LikeNotFoundGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let id = request.params.id;
    if(!id) id = request.body.id
    const item=await this.prisma.like.findFirst({where:{id}})
    if (!item) {
      throw new NotFoundException("Like Not Found");
    }
    return true;
  }
}