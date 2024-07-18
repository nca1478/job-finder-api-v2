import { Transform, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class BodyOptionsDto {
  @Transform(({ value }) => value === 'true' || value === true)
  @IsOptional()
  readonly status?: boolean = false;

  @Type(() => String)
  @IsOptional()
  readonly title?: string = null;
}
