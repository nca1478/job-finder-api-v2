import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { regExp } from '../../../common/utils/regex';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Formato de email no válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(8, { message: 'La contraseña debe tener más de 8 caracteres' })
  @Matches(regExp.password, {
    message:
      'La contraseña debe tener caracteres en mayúscula, minúscula y un número',
  })
  newPassword: string;
}
