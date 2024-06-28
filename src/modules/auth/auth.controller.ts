import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginUserDto } from './dto';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  loginGoogle() {
    return { msg: 'Google Login' };
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  loginGoogleRedirect(@Res() res: Response) {
    return res.redirect('/api/v2');
  }

  @Get('/google/status')
  loginGoogleStatus(@Req() request: Request) {
    if (request.user) return { msg: 'Authenticated!!!' };

    return { msg: 'Not Authenticated!!!' };
  }
}
