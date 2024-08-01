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
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dto';
import { GoogleAuthGuard } from '../guards/google-auth/google-auth.guard';
import { EnvConfigService } from '../../../common/env-config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: EnvConfigService,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    return HttpStatus.OK;
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleLoginRedirect(@Req() req: Request, @Res() res: Response) {
    const redirectUrl = await this.authService.loginGoogle(req.user);
    return res.redirect(redirectUrl);
  }

  @Get('/google/status')
  googleLoginStatus(@Req() req: Request) {
    if (req.user) return { msg: 'Google Authenticated!!!' };
    return { msg: 'Google Not Authenticated!!!' };
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    // return res.redirect('/api/v2');
    return req.user;
  }
}
