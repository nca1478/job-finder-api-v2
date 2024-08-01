import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../../../modules/users/services/users.service';
import { FacebookPayload, GooglePayload, JwtPayload } from '../interfaces';
import { UserEntity } from '../../users/entities/user.entity';
import { LoginUserDto } from '../dto';
import { EnvConfigService } from '../../../common/env-config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: EnvConfigService,
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
      img: payload.photo,
      google: true,
    };

    return await this.usersService.create(newUser);
  }

  public async validateUserFacebook(
    payload: FacebookPayload,
  ): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ email: payload.email });

    if (user) return user;

    const newUser = {
      name: payload.firstName + ' ' + payload.lastName,
      email: payload.email,
      password: 'N@_P@@55w0rd',
      img: payload.photo,
      facebook: true,
    };

    return await this.usersService.create(newUser);
  }

  private static jwtExtractor(req: Request): string {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token requerido o no válido');
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

  async loginSocialMedia(user: any): Promise<string> {
    if (!user) throw new UnauthorizedException(`Acceso no autorizado`);

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      img: user.img,
      role: user.role,
      facebook: user.facebook,
      google: user.google,
      createdAt: user.createdAt,
    };

    const token = await this.createJwtToken(payload);

    return `${this.configService.getUrlClientLoginRedirect()}?token=${token}`;
  }
}
