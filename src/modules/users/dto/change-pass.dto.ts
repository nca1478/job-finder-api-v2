import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { regExp } from '../../../common/utils';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
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
  newPassword: string;
}
