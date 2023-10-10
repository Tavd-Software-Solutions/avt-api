import { Injectable, Logger, HttpException } from '@nestjs/common';
import { CreateSourceDto } from '../dto/create-source.dto';
import { UpdateSourceDto } from '../dto/update-source.dto';
import {
  convertToken,
  handleErrors,
} from '../../common/services/common.service';
import { UserService } from '../../../src/users/services/users.service';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { Source } from '@prisma/client';

@Injectable()
export class SourcesService {
  private logger = new Logger('Source');

  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async create(createSourceDto: CreateSourceDto) {
    const { name, userId } = createSourceDto;

    if (name === '' || !name) throw new HttpException('Source is empty', 404);
    if (userId === '' || !userId) throw new HttpException('User is empty', 404);

    try {
      const user = await this.userService.findOne(userId);

      if (!user) throw new HttpException('user_not_found', 404);

      await this.prisma.source.create({
        data: {
          name,
          userId,
        },
      });

      this.logger.log('Source created successfully');

      return { message: `Source ${name} created successfully` };
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async findAll(context: any): Promise<Source[]> {
    try {
      const userId = convertToken(context);

      const sources = await this.prisma.source.findMany({
        where: {
          deletedAt: null,
          userId,
          OR: [{ deletedAt: null }, { userId: null }],
        },
      });

      return sources;
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async findOne(id: string): Promise<Source> {
    try {
      const source = await this.prisma.source.findUnique({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!source) throw new HttpException('Source not found', 404);

      return source;
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async update(id: string, updateSourceDto: UpdateSourceDto): Promise<any> {
    try {
      const source = await this.prisma.source.findUnique({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!source) throw new HttpException('Source not found', 404);

      await this.prisma.source.update({
        where: {
          id,
        },
        data: {
          name: updateSourceDto.name,
          updatedAt: new Date(),
        },
      });

      return { message: `Source ${source.name} updated successfully` };
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async softDelete(id: string, context: any): Promise<any> {
    try {
      const userId = convertToken(context);

      const source = await this.prisma.source.findUnique({
        where: {
          id,
          userId,
          deletedAt: null,
        },
      });

      if (!source) throw new HttpException('Source not found', 404);

      await this.prisma.source.update({
        where: {
          id,
          userId,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return { message: `Source ${source.name} deleted successfully` };
    } catch (e) {
      handleErrors(e.message, e.code);
    }
  }
}
