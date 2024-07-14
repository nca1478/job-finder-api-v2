import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { setSeederFactory } from 'typeorm-extension';
import { UserEntity } from '../../../modules/users/entities/user.entity';
import { roleEnum } from '../../../modules/users/models/user.model';
import { getRandomInt } from '../../../common/utils';

export default setSeederFactory(UserEntity, async (faker) => {
  const user = new UserEntity();

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  user.id = randomUUID();
  user.name = `${firstName} ${lastName}`;
  user.email = faker.internet.email({ firstName, lastName }).toLowerCase();
  user.password = await hash(faker.internet.password(), 10);
  user.role = faker.helpers.arrayElement([roleEnum.user]);
  user.img = faker.image.avatar();
  user.google = false;
  user.facebook = false;
  user.tokenRecovery = null;
  user.birthday = faker.date.past({ years: getRandomInt(20, 50) });
  user.profession = faker.person.jobArea();
  user.education = faker.person.jobTitle();
  user.cvUrl = null;
  user.linkedinUser = null;
  user.twitterUser = null;
  user.instagramUser = null;
  user.facebookUser = null;
  user.active = true;

  return user;
});
