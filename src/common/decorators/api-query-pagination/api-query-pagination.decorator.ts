import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Order } from '../../constants';

export function ApiQueryPagination() {
  return applyDecorators(
    ApiQuery({ name: 'order', enum: Order, required: false }),
    ApiQuery({ name: 'page', type: Number, required: false }),
    ApiQuery({ name: 'take', type: Number, required: false }),
  );
}
