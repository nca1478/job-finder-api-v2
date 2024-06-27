import { Request } from 'express';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  public async createJwtToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }

  public async validateUser(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id: payload.id },
    });

    if (!user) {
      throw new UnauthorizedException(`Acceso no autorizado`);
    }

    return user;
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
}
