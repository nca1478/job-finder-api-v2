import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileValidatorPipe implements PipeTransform {
  async transform(
    file: Express.Multer.File,
    metadata: ArgumentMetadata,
  ): Promise<Express.Multer.File> {
    const maxSize = 1000 * 1024; // Tamaño máximo en kilobytes
    const allowedTypes = ['image/jpeg', 'application/pdf'];

    if (file.size > maxSize) {
      throw new BadRequestException('El archivo es demasiado grande.');
    }

    // Valida el tipo de archivo (por ejemplo, solo imágenes JPEG)
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Tipo de archivo no permitido.');
    }

    // Si pasa todas las validaciones, devuelve el archivo
    return file;
  }
}
