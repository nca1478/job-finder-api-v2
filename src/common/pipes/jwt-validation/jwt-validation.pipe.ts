import { JwtService } from '@nestjs/jwt';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class JwtValidationPipe implements PipeTransform {
  constructor(private readonly jwtService: JwtService) {}

  transform(token: string, metadata: ArgumentMetadata) {
    try {
      if (!token || token.length < 3) {
        throw new BadRequestException('Token requerido');
      }

      this.jwtService.verify(token);

      return token;
    } catch (error) {
      throw new BadRequestException('Token JWT no válido');
    }
  }
}
