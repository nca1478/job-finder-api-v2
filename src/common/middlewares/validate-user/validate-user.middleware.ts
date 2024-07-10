import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../modules/users/entities/user.entity';
import { Repository } from 'typeorm';

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
        return res.status(404).json({ msg: 'Usuario no encontrado' });
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(500).json({ msg: 'Error interno del servidor' });
    }
  }
}
