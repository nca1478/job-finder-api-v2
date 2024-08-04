import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

export function ApiBodySearch() {
  return applyDecorators(
    ApiBody({
      schema: {
        properties: {
          title: { type: 'string' },
        },
        example: { title: 'algun titulo' },
      },
    }),
  );
}
