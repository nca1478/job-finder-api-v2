import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async createJwtToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
