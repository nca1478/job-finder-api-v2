import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChangePassEmailDto {
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Formato de email no válido' })
  email: string;
}
