import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'Email del usuario',
    required: true,
    example: 'test@gmail.com',
  })
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Formato de email no válido' })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    required: true,
    example: '123456Pass**',
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;
}
