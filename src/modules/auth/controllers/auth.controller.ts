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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dto';
import { EnvConfigService } from '../../../common/env-config';
import { FacebookAuthGuard, GoogleAuthGuard } from '../guards';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: EnvConfigService,
  ) {}

  @Post('/login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Datos del usuario y token JWT' })
  @HttpCode(HttpStatus.OK)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('/google')
  @ApiOperation({ summary: 'Iniciar sesión por Google' })
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    return HttpStatus.OK;
  }

  @Get('/google/redirect')
  @ApiOperation({ summary: 'Redirección inicio sesión por Google' })
  @UseGuards(GoogleAuthGuard)
  async googleLoginRedirect(@Req() req: Request, @Res() res: Response) {
    const redirectUrl = await this.authService.loginSocialMedia(req.user);
    return res.redirect(redirectUrl);
  }

  @Get('/facebook')
  @ApiOperation({ summary: 'Iniciar sesión por Facebook' })
  @UseGuards(FacebookAuthGuard)
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @ApiOperation({ summary: 'Redirección inicio sesión por Facebook' })
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const redirectUrl = await this.authService.loginSocialMedia(req.user);
    return res.redirect(redirectUrl);
  }
}
