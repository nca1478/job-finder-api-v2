import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChangePassEmailDto {
  @ApiProperty({
    description: 'Email del usuario',
    required: true,
    example: 'test@gmail.com',
  })
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Formato de email no válido' })
  email: string;
}
