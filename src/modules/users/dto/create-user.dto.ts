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
import { regExp } from '../../../utils/regex';

export class CreateUserDto implements UserModel {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Formato de email no válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(8, { message: 'La contraseña debe tener más de 8 caracteres' })
  @Matches(regExp.password, {
    message:
      'La contraseña debe tener caracteres en mayúscula, minúscula y un número',
  })
  password: string;

  @IsDateString({}, { message: 'Formato de fecha de nacimiento no válido' })
  @IsOptional()
  birthday: Date;

  @IsOptional()
  profession: string;

  @IsOptional()
  education: string;

  @IsOptional()
  @IsUrl()
  cvUrl: string;

  @IsOptional()
  linkedinUser: string;

  @IsOptional()
  twitterUser: string;

  @IsOptional()
  instagramUser: string;

  @IsOptional()
  facebookUser: string;
}
