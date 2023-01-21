import { Controller, Post, Body, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UseFilters } from '@nestjs/common/decorators';
import { PrismaClientExceptionFilter } from '../prisma-client-exception/prisma-client-exception.filter';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
@ApiTags('Auth')
@UseFilters(PrismaClientExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/logout')
  logout(@Request() req, @Response({ passthrough: true }) res) {
    return this.authService.logout(req, res);
  }
  @Post('/login')
  login(
    @Body() LoginUserDto: LoginUserDto,
    @Request() req,
    @Response({ passthrough: true }) res,
  ) {
    return this.authService.login(LoginUserDto, req, res);
  }
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
}
