import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ChangePassDto,
  CreateUserDto,
  UpdateUserDto,
  VerifyUserDto,
} from '../dto';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../../common/dtos';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { EmailsService } from '../../../modules/emails/services/emails/emails.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    private readonly emailService: EmailsService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.usersRepository.create(createUserDto);

    await this.usersRepository.save(newUser);

    delete newUser.password;

    return newUser;
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<UserEntity>> {
    const queryBuilder = this.usersRepository.createQueryBuilder('u');

    queryBuilder
      .orderBy('u.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);

    // return this.usersRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no fué encontrado`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { email, google: false, facebook: false },
    });

    if (!user) {
      throw new NotFoundException(
        'Email no encontrado o no permite cambiar contraseña.',
      );
    }

    return user;
  }

  async findOneWithPassword(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: [
        'id',
        'name',
        'email',
        'password',
        'role',
        'img',
        'google',
        'facebook',
        'cvUrl',
        'createdAt',
      ],
    });

    if (!user) {
      throw new NotFoundException('Email no encontrado');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.preload({
      ...updateUserDto,
      id,
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no fué encontrado`);
    }

    await this.usersRepository.save(user);

    delete user.password;

    return user;
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no fué encontrado`);
    }

    return this.usersRepository.remove(user);
  }

  async verify(verifyUserDto: VerifyUserDto): Promise<UserEntity> {
    const { email, password } = verifyUserDto;

    const user = await this.findOneWithPassword(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException(
        'Credenciales no validas (email o password)',
      );
    }

    delete user.password;

    return user;
  }

  async sendEmailChangePass(changePassDto: ChangePassDto) {
    const { email } = changePassDto;

    const user = await this.findOneByEmail(email);

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const tokenRecovery = await this.authService.createJwtToken(payload);

    await this.update(user.id, { ...user, tokenRecovery });

    try {
      await this.emailService.changePassEmail(email, tokenRecovery);
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
