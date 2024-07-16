import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { UserEntity } from '../../../../modules/users/entities/user.entity';
import {
  roleEnum,
  UserModel,
} from '../../../../modules/users/models/user.model';

export class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(UserEntity);

    const data: UserModel = {
      id: randomUUID(),
      name: 'Nelson Cadenas',
      email: 'nca1478@gmail.com',
      password: await hash('123456Pass$$', 10),
      role: roleEnum.admin,
    };

    const user = await repository.findOneBy({ name: data.name });

    // Insert only one record with this username.
    if (!user) {
      await repository.insert([data]);
    }

    // ---------------------------------------------------

    const userFactory = await factoryManager.get(UserEntity);

    // Insert only one record.
    // await userFactory.save();

    // Insert many records in database.
    await userFactory.saveMany(10);
  }
}
