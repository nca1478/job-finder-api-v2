import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { EnvConfigService } from '../../../common/env-config';

@Injectable()
export class FilesService {
  constructor(private readonly configService: EnvConfigService) {
    cloudinary.config({
      cloud_name: this.configService.getCloudinaryCloudName(),
      api_key: this.configService.getCloudinaryApiKey(),
      api_secret: this.configService.getCloudinaryApiSecret(),
    });
  }
}
