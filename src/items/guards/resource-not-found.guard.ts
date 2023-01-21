/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, CanActivate, Inject, ExecutionContext } from '@nestjs/common';

import { Request } from 'express';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemNotFoundGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let id = request.params.id;
    if(!id) id = request.body.id
    if(!id) id = request.body.originItemId
    const item=await this.prisma.item.findFirst({where:{id}})
    if (!item) {
      throw new NotFoundException("Item Not Found");
    }
    return true;
  }
}