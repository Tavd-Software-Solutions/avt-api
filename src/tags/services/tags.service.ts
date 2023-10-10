import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import {
  convertToken,
  handleErrors,
} from '../../../src/common/services/common.service';
import { UserService } from '../../../src/users/services/users.service';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { Tag } from '@prisma/client';

@Injectable()
export class TagsService {
  private logger = new Logger('Tag');

  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<any> {
    const { name, userId } = createTagDto;

    if (name === '' || !name) throw new HttpException('Tag is empty', 404);
    if (userId === '' || !userId) throw new HttpException('User is empty', 404);

    try {
      const { userId } = createTagDto;
      const user = await this.userService.findOne(userId);

      if (!user) throw new HttpException('user_not_found', 404);

      const tag = await this.prisma.tag.create({
        data: {
          name,
          userId,
        },
      });

      this.logger.log('Created successfully');

      return { message: `Tag ${tag.name} created successfully` };
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async findAll(context: any): Promise<Tag[]> {
    try {
      const userId = convertToken(context);
      const tags = await this.prisma.tag.findMany({
        where: {
          deletedAt: null,
        },
      });

      return tags;
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async findOne(id: string): Promise<Tag> {
    try {
      const tag = await this.prisma.tag.findUnique({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!tag) throw new HttpException('Tag not found', 404);

      return tag;
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<any> {
    try {
      const { name } = updateTagDto;

      const tag = await this.prisma.tag.findUnique({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!tag) throw new HttpException('Tag not found', 404);

      await this.prisma.tag.update({
        where: {
          id,
        },
        data: {
          name: updateTagDto.name,
          updatedAt: new Date(),
        },
      });

      return { message: `Tag ${name} updated successfully` };
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async softDelete(id: string, context: any): Promise<any> {
    try {
      const userId = convertToken(context);

      const tag = await this.prisma.tag.update({
        where: {
          id,
          userId,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return { message: `Tag ${tag.name} deleted successfully` };
    } catch (e) {
      handleErrors(e.message, e.code);
    }
  }
}
