import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserEntity } from '../entities/user.entity';
import {
  ChangePassEmailDto,
  ChangePasswordDto,
  CreateUserDto,
  UpdateUserDto,
  VerifyUserDto,
} from '../dto';
import { PageDto, PageOptionsDto } from '../../../common/dtos';
import { UsersService } from '../services/users.service';
import { CloudinaryService } from '../../../common/modules/cloudinary/services/cloudinary.service';
import { FileValidatorPipe, JwtValidationPipe } from '../../../common/pipes';
import { createUserPayload } from '../../../common/utils/payloads/create-user.payload';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const newUser = await this.usersService.create(createUserDto);
    const payload = createUserPayload(newUser);

    const token = await this.authService.createJwtToken({ ...payload });
    return { user: newUser, token };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UserEntity>> {
    return this.usersService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    const { cvUrl: currentFile } = await this.usersService.findOne(id);

    if (currentFile) await this.cloudinaryService.removeFile(currentFile);
    return this.usersService.remove(id);
  }

  @Post('/verify')
  @HttpCode(HttpStatus.OK)
  verify(@Body() verifyUserDto: VerifyUserDto): Promise<UserEntity> {
    return this.usersService.verify(verifyUserDto);
  }

  @Put('/change-password')
  sendEmailChangePass(
    @Body() changePassEmailDto: ChangePassEmailDto,
  ): Promise<any> {
    return this.usersService.sendEmailChangePass(changePassEmailDto);
  }

  @Put('/change-password/:token')
  changePass(
    @Param('token', JwtValidationPipe) token: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    return this.usersService.changePassword(changePasswordDto, token);
  }

  @Post(':id/upload-file')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile('file', FileValidatorPipe) file: Express.Multer.File,
  ) {
    const { cvUrl: currentFile } = await this.usersService.findOne(id);

    if (currentFile) await this.cloudinaryService.removeFile(currentFile);
    return await this.cloudinaryService.uploadFile(file);
  }
}
