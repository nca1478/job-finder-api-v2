import {
  ExecutionContext,
  InternalServerErrorException,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const ValidateUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const id = req.params.id;
    const user = req.user;

    if (!user) throw new InternalServerErrorException('Usuario no encontrado');

    if (user.id !== id) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return user;
  },
);
