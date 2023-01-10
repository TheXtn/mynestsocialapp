import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { jwtSecret } from './utils/constants';
import { Request, Response } from 'express';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async hashPwd(pwd: string): Promise<string> {
    const hashed = await bcrypt.hash(pwd, 10);
    return hashed;
  }
  async comparePwd(pwd: string, hash: string) {
    const result = await bcrypt.compare(pwd, hash);
    return result;
  }
  async signToken(argrs: { email: string; id: string }) {
    return this.jwt.signAsync(argrs, { secret: jwtSecret });
  }
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashPwd(createUserDto.password);
    createUserDto.password = hashedPassword;
    return this.prisma.user.create({
      data: createUserDto,
    });
  }
  async login(loginUserDto: LoginUserDto, req: Request, res: Response) {
    const email = loginUserDto.email;
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    const checkUser = await this.comparePwd(
      loginUserDto.password,
      user.password,
    );
    if (!checkUser) {
      return new BadRequestException('Wrong login');
    }
    const token = await this.signToken({
      email: user.email,
      id: user.id,
    });
    res.cookie('token', token);
    return { message: 'Logged in successfully' };
  }
  async logout(req: Request, res: Response) {
    res.clearCookie('token');
    return { message: 'Logged out successfully' };
  }
}