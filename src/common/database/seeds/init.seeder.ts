import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';

import userFactory from '../factories/users/user.factory';
import { SkillSeeder, UserSeeder } from './index';

export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [UserSeeder, SkillSeeder],
      factories: [userFactory],
    });
  }
}
