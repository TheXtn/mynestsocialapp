import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { jwtSecret } from './utils/constants';
import { Request, Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
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
  async signToken(args: { email: string; id: string; role: string }) {
    return this.jwt.signAsync(args, { secret: jwtSecret });
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
    if (!user) {
      return new BadRequestException('Wrong login');
    }
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
      role: user.role,
    });
    res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.cookie('token', token, {
      secure: true,
      httpOnly: true,
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
      sameSite: 'none',
      domain: process.env.apiDomain,
    });
    return { message: 'Logged in successfully' };
  }
  async logout(req: Request, res: Response) {
    res.clearCookie('token');
    return { message: 'Logged out successfully' };
  }
}
