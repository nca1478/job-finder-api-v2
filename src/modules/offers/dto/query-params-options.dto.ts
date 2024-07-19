import { Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class QueryParamsOptionsDto {
  @Transform(({ value }) => value === 'true')
  @IsBoolean({ message: 'Status no válido' })
  status: boolean;
}
