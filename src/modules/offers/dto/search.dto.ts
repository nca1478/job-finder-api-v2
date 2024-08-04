import { IsOptional } from 'class-validator';

export class SearchDto {
  @IsOptional()
  readonly title?: string = null;
}
