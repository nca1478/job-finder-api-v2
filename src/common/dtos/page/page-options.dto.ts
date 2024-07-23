import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from '../../../common/constants';

export class PageOptionsDto {
  @IsEnum(Order, {
    message: `Order debe ser uno de los siguientes valores: ${Object.values(Order).join(', ')}`,
  })
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @Type(() => Number)
  @IsInt({ message: 'Page debe ser un número entero' })
  @Min(1, { message: 'Page no puede ser menor que 1' })
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsInt({ message: 'Take debe ser un número entero' })
  @Min(1, { message: 'Take no puede ser menor que 1' })
  @Max(50, { message: 'Take no puede ser mayor que 50' })
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
