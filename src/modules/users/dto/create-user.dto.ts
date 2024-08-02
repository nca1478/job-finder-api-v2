import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';
import { UserModel } from '../models/user.model';
import { regExp } from '../../../common/utils';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements UserModel {
  @ApiProperty({
    description: 'Nombre Completo',
    required: true,
    example: 'Pedro Perez',
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @ApiProperty({
    description: 'Email',
    required: true,
    example: 'test@gmail.com',
  })
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Formato de email no válido' })
  email: string;

  @ApiProperty({
    description: 'Contraseña',
    required: true,
    example: 'alguna contraseña',
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(8, { message: 'La contraseña debe tener más de 8 caracteres' })
  @Matches(regExp.password, {
    message:
      'La contraseña debe tener caracteres en mayúscula, minúscula y un número',
  })
  password: string;

  @ApiProperty({
    description: 'Url de imagen',
    required: false,
    example: 'http://www.picture.com/photo.jpg',
  })
  @IsOptional()
  @IsUrl()
  img?: string;

  @ApiProperty({
    description: 'Fecha de nacimiento',
    required: false,
    example: '2000-01-01',
  })
  @IsOptional()
  @IsDateString({}, { message: 'Formato de fecha de nacimiento no válido' })
  birthday?: Date;

  @ApiProperty({
    description: 'Profesión',
    required: false,
    example: 'Ingeniero en Informática',
  })
  @IsOptional()
  profession?: string;

  @ApiProperty({
    description: 'Educación',
    required: false,
    example: 'Universitaria',
  })
  @IsOptional()
  education?: string;

  @ApiProperty({
    description: 'Url de Curriculum',
    required: false,
    example: 'http://www.server.com/cv.pdf',
  })
  @IsOptional()
  @IsUrl()
  cvUrl?: string;

  @ApiProperty({
    description: 'Usuario Linkedin',
    required: false,
    example: 'pepe1234',
  })
  @IsOptional()
  linkedinUser?: string;

  @ApiProperty({
    description: 'Usuario Twitter',
    required: false,
    example: 'pepe1234',
  })
  @IsOptional()
  twitterUser?: string;

  @ApiProperty({
    description: 'Usuario Instagram',
    required: false,
    example: 'pepe1234',
  })
  @IsOptional()
  instagramUser?: string;

  @ApiProperty({
    description: 'Usuario Facebook',
    required: false,
    example: 'pepe1234',
  })
  @IsOptional()
  facebookUser?: string;

  @IsOptional()
  tokenRecovery?: string;
}
