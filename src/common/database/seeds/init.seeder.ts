import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';

import userFactory from '../factories/users/user.factory';
import { SectorSeeder, SkillSeeder, UserSeeder } from './index';
import { Logger } from '@nestjs/common';

export default class InitSeeder implements Seeder {
  private readonly logger = new Logger('InitSeeder');

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [UserSeeder, SkillSeeder, SectorSeeder],
      factories: [userFactory],
    });

    this.logger.log('Seed ejecutado exitosamente');
  }
}
