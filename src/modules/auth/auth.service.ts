import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { LoginUserDto } from './dto';
import { UsersService } from '../users/users.service';
import { GooglePayload, JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async createJwtToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }

  public async validateUser(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.usersService.findOne(payload.id);

    if (!user) {
      throw new UnauthorizedException(`Acceso no autorizado`);
    }

    return user;
  }

  public async validateUserGoogle(payload: GooglePayload): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ email: payload.email });

    if (user) return user;

    const newUser = {
      name: payload.displayName,
      email: payload.email,
      password: 'N@_P@@55w0rd',
      google: true,
    };

    return await this.usersService.create(newUser);
  }

  private static jwtExtractor(req: Request): string {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new BadRequestException('Token no válido');
    }

    const [, token] = authHeader.split(' ');

    return token;
  }

  public returnJwtExtractor(): (req: Request) => string {
    return AuthService.jwtExtractor;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.usersService.findOneWithPassword(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException(
        'Credenciales no validas (email o password)',
      );
    }

    delete user.password;

    const token = await this.createJwtToken({ ...user });

    return {
      user,
      token,
    };
  }
}
