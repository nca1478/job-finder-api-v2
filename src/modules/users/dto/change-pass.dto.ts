import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChangePassDto {
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Formato de email no válido' })
  email: string;
}
