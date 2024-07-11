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
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { UserEntity } from '../entities/user.entity';
import {
  ChangePassEmailDto,
  ChangePasswordDto,
  CreateUserDto,
  UpdateUserDto,
  VerifyUserDto,
} from '../dto';
import { UsersService } from '../services/users.service';
import { PageDto, PageOptionsDto } from '../../../common/dtos';
import { JwtValidationPipe } from '../../../common/pipes/jwt-validation/jwt-validation.pipe';
import { CloudinaryService } from '../../../common/modules/cloudinary/services/cloudinary.service';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
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
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
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

  @Post(':id/upload-pdf')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.cloudinaryService.uploadFile(file);
  }
}
