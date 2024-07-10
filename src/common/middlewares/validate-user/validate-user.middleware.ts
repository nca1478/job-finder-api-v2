import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserEntity } from '../../../modules/users/entities/user.entity';
import { responseError } from '../../utils';

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async use(req: any, res: any, next: () => void) {
    try {
      const userId = req.params.id;
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        const error = responseError({ msg: 'Usuario no encontrado' }, 404);
        return res.status(404).json(error);
      }

      req.user = user;

      next();
    } catch (err: any) {
      if (err.errors?.status) {
        return res.status(err.errors?.status).json(err);
      }

      const error = responseError([err], err.errors?.status);
      res.status(500).json(error);
    }
  }
}
