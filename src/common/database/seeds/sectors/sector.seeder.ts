import * as path from 'path';
import { readFileSync } from 'fs';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { SectorEntity } from '../../../../modules/sectors/entities/sector.entity';

export class SectorSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const data = path.join(__dirname + '/' + '..' + '/data/sectors.data.json');
    const { sectors } = JSON.parse(readFileSync(data, 'utf8'));
    const repository = dataSource.getRepository(SectorEntity);
    const sectorsArray: any = [];

    for await (const sector of sectors) {
      const findSector = await repository.findOneBy({ name: sector.name });

      if (!findSector) sectorsArray.push(repository.create(sector));
    }

    await repository.save(sectorsArray);
  }
}
