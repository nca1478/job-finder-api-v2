import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Debe ser un email válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(8, { message: 'La contraseña debe tener más de 8 caracteres' })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe tener caracteres en mayúscula, minúscula y un número',
  })
  password: string;
}
