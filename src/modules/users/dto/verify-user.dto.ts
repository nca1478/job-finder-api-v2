import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyUserDto {
  @ApiProperty({
    description: 'Email',
    required: true,
    example: 'test@gmail.com',
  })
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Formato de email no válido' })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    required: true,
    example: 'alguna contraseña',
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;
}
