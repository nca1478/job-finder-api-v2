import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { LoginUserDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('/google')
  loginGoogle() {
    return { msg: 'Google Login' };
  }

  @Get('/google/redirect')
  loginGoogleRedirect() {
    return { msg: 'Google Redirect' };
  }

  @Get('/google/status')
  loginGoogleStatus(@Req() request: Request) {
    return { msg: 'Google Authentication Status' };
  }
}
