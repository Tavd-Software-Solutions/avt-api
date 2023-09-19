import { CreateSourceDto } from 'src/sources/dto/create-source.dto';
import { Source } from 'src/sources/entities/source.entity';
import { CreateTagDto } from 'src/tags/dto/create-tag.dto';
import { Tag } from 'src/tags/entities/tag.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Connection } from 'typeorm';

export default class Seeder {
  public static async run(connection: Connection): Promise<void> {
    const userRepository = connection.getRepository(User);
    const tagRepository = connection.getRepository(Tag);
    const sourceRepository = connection.getRepository(Source);
    const default_user: CreateUserDto = {
      email: 'default_user@gmail.com',
      name: 'admin',
      password: 'admin',
      login: 'admin',
      coin: 'BRL',
    };

    if ((await userRepository.find()).length === 0) {
      await userRepository.insert(default_user);
    }

    const default_tag: CreateTagDto = {
      name: 'Tag Deafult',
      userId: null,
    };

    if ((await tagRepository.find()).length === 0) {
      await tagRepository.insert(default_tag);
    }

    const default_source: CreateSourceDto = {
      name: 'Source Default',
      userId: null,
    };

    if ((await sourceRepository.find()).length === 0) {
      await sourceRepository.insert(default_source);
    }
  }
}
