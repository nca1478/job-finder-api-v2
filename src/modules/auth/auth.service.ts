import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserEntity } from '../users/entities/user.entity';
import { LoginUserDto } from './dto';
import { UsersService } from '../users/users.service';
import { UserProfile } from './interfaces/profile.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  public async validateUserGoogle(profile: UserProfile) {
    const user = await this.usersRepository.findOneBy({ email: profile.email });

    if (user) return user;

    const newUser = {
      name: profile.displayName,
      email: profile.email,
      password: 'N@_P@@55w0rd',
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
