import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateRevenueDto } from '../dto/create-revenue.dto';
import { UpdateRevenueDto } from '../dto/update-revenue.dto';
import {
  convertToken,
  handleErrors,
} from '../../../src/common/services/common.service';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
  WhereDto,
} from '../dto/page.dto';
import { TagsService } from '../../../src/tags/services/tags.service';
import { SourcesService } from '../../../src/sources/services/sources.service';
import { UserService } from '../../../src/users/services/users.service';
import {
  IBarChart,
  IPieChart,
  IStackedChart,
} from '../dto/charts-interface.dto';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { Prisma, Revenue } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { TypeRevenue } from '../enums/enum';

@Injectable()
export class RevenueService {
  private logger = new Logger('Revenue');

  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private sourceService: SourcesService,
    private tagService: TagsService,
  ) {}

  async create(createRevenueDto: CreateRevenueDto, context: any): Promise<any> {
    const { sourceId, tagId } = createRevenueDto;
    const userId = convertToken(context);

    const user = await this.userService.findOne(userId);

    if (!user) throw new HttpException('user_not_found', 404);

    const source = await this.sourceService.findOne(sourceId, context);

    if (!source) throw new HttpException('source_not_found', 404);

    const tag = await this.tagService.findOne(tagId, context);

    if (!tag) throw new HttpException('tag_not_found', 404);

    try {
      await this.prisma.revenue.create({
        data: {
          name: createRevenueDto.name,
          coin: createRevenueDto.coin,
          value: createRevenueDto.value,
          sourceId: sourceId,
          tagId: tagId,
          payMethod: createRevenueDto.payMethod,
          typeRevenue: createRevenueDto.typeRevenue,
          description: createRevenueDto.description,
          userId: userId,
          date: new Date(createRevenueDto.date),
        },
      });

      this.logger.log('Revenue created successfully');

      return {
        message: `Revenue ${createRevenueDto.name} created successfully`,
      };
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
    context: any,
  ): Promise<PageDto<Revenue>> {
    try {
      const { order, skip, take, where } = pageOptionsDto;
      const userId = convertToken(context);
      const filter = this.getFilter(where, userId, true);

      const revenues = await this.prisma.revenue.findMany({
        where: filter,
        skip,
        take,
        include: {
          tag: true,
        },
        orderBy: {
          createdAt: order,
        },
      });

      const itemCount = revenues.length;

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      return new PageDto(revenues, pageMetaDto);
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async findOne(id: string, context: any): Promise<Revenue> {
    try {
      const userId = convertToken(context);
      const revenue = await this.prisma.revenue.findUnique({
        where: {
          id,
          userId,
          deletedAt: null,
        },
        include: {
          tag: true,
          source: true,
        },
      });

      if (!revenue) throw new HttpException('Revenue not found', 404);

      return revenue;
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async update(
    id: string,
    updateRevenueDto: UpdateRevenueDto,
    context: any,
  ): Promise<any> {
    const { sourceId, tagId } = updateRevenueDto;
    const userId = convertToken(context);
    try {
      const revenue = await this.prisma.revenue.findUnique({
        where: {
          id,
          userId,
          deletedAt: null,
        },
      });

      if (!revenue) throw new HttpException('Revenue not found', 404);

      const source = await this.sourceService.findOne(sourceId, context);

      if (!source) throw new HttpException('source_not_found', 404);

      const tag = await this.tagService.findOne(tagId, context);

      if (!tag) throw new HttpException('tag_not_found', 404);

      await this.prisma.revenue.update({
        where: {
          id,
          userId,
        },
        data: {
          name: updateRevenueDto.name,
          coin: updateRevenueDto.coin,
          value: new Decimal(updateRevenueDto.value),
          date: updateRevenueDto.date,
          description: updateRevenueDto.description,
          payMethod: updateRevenueDto.payMethod,
          typeRevenue: updateRevenueDto.typeRevenue,
          sourceId: source.id,
          tagId: tag.id,
          updatedAt: new Date(),
        },
      });

      return {
        message: `Revenue ${updateRevenueDto.name} updated successfully`,
      };
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async softDelete(id: string, context: any): Promise<any> {
    try {
      const userId = convertToken(context);

      const revenue = await this.prisma.revenue.findUnique({
        where: {
          id,
          userId,
          deletedAt: null,
        },
      });

      if (!revenue) throw new HttpException('Revenue not found', 404);

      await this.prisma.revenue.update({
        where: {
          id,
          userId,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return {
        message: `Revenue ${revenue.name} deleted successfully`,
      };
    } catch (e) {
      handleErrors(e.message, e.code);
    }
  }

  async getAmount(context: any): Promise<number> {
    try {
      const userId = convertToken(context);

      const revenues = await this.prisma.revenue.findMany({
        where: {
          userId,
          deletedAt: null,
        },
      });

      const amount = revenues.reduce((amount: number, entity: Revenue) => {
        let value = 0;
        if (entity.typeRevenue === TypeRevenue.EXPENSE) {
          value = amount - Number(entity.value);
        }
        if (entity.typeRevenue === TypeRevenue.INCOMING) {
          value = amount + Number(entity.value);
        }
        return value;
      }, 0);

      return amount;
    } catch (e) {
      handleErrors(e.message, e.code);
    }
  }

  async getPieChart(context: any): Promise<IPieChart> {
    try {
      const userId = convertToken(context);

      const revenues = await this.prisma.revenue.findMany({
        where: {
          userId,
          deletedAt: null,
        },
      });

      const totalExpenses = revenues.reduce(
        (total: number, entity: Revenue) => {
          if (entity.typeRevenue === TypeRevenue.EXPENSE) {
            return total + Number(entity.value);
          }
          return total;
        },
        0,
      );

      const totalIncomings = revenues.reduce(
        (total: number, entity: Revenue) => {
          if (entity.typeRevenue === TypeRevenue.INCOMING) {
            return total + Number(entity.value);
          }
          return total;
        },
        0,
      );

      return { expense: totalExpenses, incoming: totalIncomings };
    } catch (e) {
      handleErrors(e.message, e.code);
    }
  }

  async getStackedChart(context: any): Promise<IStackedChart> {
    try {
      const userId = convertToken(context);
      const currentDate = new Date();
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
      );
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
      );

      const revenues = await this.prisma.revenue.findMany({
        where: {
          userId,
          deletedAt: null,
          date: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
        },
      });

      const sortedDates = revenues
        .map((entity) => entity.date)
        .sort((a, b) => {
          const dateA = new Date(a);
          const dateB = new Date(b);
          return dateA.getTime() - dateB.getTime();
        });
      const listDates = Array.from(
        new Set(sortedDates.map((date) => this.formatDate(date))),
      );
      const listExpenses = revenues.reduce(
        (accumulator: number[], entity: Revenue) => {
          if (entity.typeRevenue === TypeRevenue.EXPENSE) {
            accumulator.push(Number(entity.value));
          }
          return accumulator;
        },
        [],
      );

      const listIncomings = revenues.reduce(
        (accumulator: number[], entity: Revenue) => {
          if (entity.typeRevenue === TypeRevenue.INCOMING) {
            accumulator.push(Number(entity.value));
          }
          return accumulator;
        },
        [],
      );
      return {
        dates: listDates,
        expenses: listExpenses,
        incomings: listIncomings,
      };
    } catch (e) {
      handleErrors(e.message, e.code);
    }
  }

  async getBarChart(
    pageOptionsDto: WhereDto,
    context: any,
  ): Promise<IBarChart> {
    try {
      
      const userId = convertToken(context);

      const where = this.getFilter(pageOptionsDto, userId);

      const revenues = await this.prisma.revenue.findMany({
        where,
        orderBy: {
          createdAt: 'asc',
        },
      });

      const listDates = revenues
        .map((entity) => entity.date)
        .sort((a, b) => {
          const dateA = new Date(a);
          const dateB = new Date(b);
          return dateA.getTime() - dateB.getTime();
        })
        .map((date) => this.formatDate(date));

      const listRevenues = revenues.reduce(
        (accumulator: number[], entity: Revenue) => {
          if (entity.typeRevenue === TypeRevenue.EXPENSE) {
            accumulator.push(Number(entity.value) * -1);
          }
          if (entity.typeRevenue === TypeRevenue.INCOMING) {
            accumulator.push(Number(entity.value));
          }
          return accumulator;
        },
        [],
      );

      return {
        dates: listDates,
        data: listRevenues,
      };
    } catch (e) {
      handleErrors(e.message, e.code);
    }
  }
  /**
   * HELPERS
   */

  private getFilter(options: WhereDto, userId = null, deteleted = false) {
    const where: Prisma.RevenueWhereInput = {};
      // Loop sobre as chaves da WhereDto
      Object.keys(options).forEach((key) => {
        const value = options[key];

        if (value !== undefined && value !== null && key === 'value') {
          where[key] = { equals: value };
        }
        // Se o valor existir e não for uma data, aplique o filtro
        if (value !== undefined && value !== "" && value !== null && !Array.isArray(value) && key !== 'startDate' && key !== 'endDate') {
          if (key === 'name') return where[key] =  { contains: value } ;
          where[key] = value;
        }

        // Se o valor for uma data, use gte/lte para intervalo de datas
        if (value !== undefined && value !== null && (key === 'startDate' || key === 'endDate')) {
          where['createdAt'] = {
            [key === 'startDate' ? 'gte' : 'lte']: value,
          };
        }

        // Se o valor for uma matriz (como tagId), use 'in'
        if (Array.isArray(value) && value.length > 0) {
          where[key] = { in: value };
        }

        if (userId) {
          where["userId"] = userId;
        }

        if (deteleted) {
          where["deletedAt"] = null;
        }

      });

      return where;
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
  }
}
