import * as path from 'path';
import { readFileSync } from 'fs';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { SkillEntity } from '../../../../modules/skills/entities/skill.entity';

export class SkillSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const data = path.join(__dirname + '/' + '..' + '/data/skills.data.json');
    const { skills } = JSON.parse(readFileSync(data, 'utf8'));
    const repository = dataSource.getRepository(SkillEntity);
    const skillsArray: any = [];

    for await (const skill of skills) {
      const findSkill = await repository.findOneBy({ name: skill.name });

      if (!findSkill) skillsArray.push(repository.create(skill));
    }

    await repository.save(skillsArray);
  }
}
