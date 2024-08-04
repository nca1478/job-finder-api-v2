import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SearchDto {
  @Type(() => String)
  @IsOptional()
  readonly title?: string = null;
}
