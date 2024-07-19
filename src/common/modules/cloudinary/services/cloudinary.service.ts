import * as streamifier from 'streamifier';
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from '../../../../common/interfaces';

@Injectable()
export class CloudinaryService {
  public uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject({ msg: error.message });

          resolve({ msg: 'Subida de archivo exitosa', url: result.url });
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  public removeFile(currentFile: string): Promise<any> {
    const publicId = this.extractPublicId(currentFile);

    return new Promise<{ msg: string }>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject({ msg: error.message });

        resolve({ msg: 'Archivo eliminado exitosamente' });
      });
    });
  }

  private extractPublicId(currentFile: string): string {
    const arrayUrl = currentFile.split('/');
    const fileName = arrayUrl[arrayUrl.length - 1];
    const [publicId] = fileName.split('.');

    return publicId;
  }
}
