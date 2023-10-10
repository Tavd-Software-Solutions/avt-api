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
import { Revenue } from '@prisma/client';
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

  async create(createRevenueDto: CreateRevenueDto): Promise<any> {
    const { sourceId, tagId, userId } = createRevenueDto;

    const user = await this.userService.findOne(userId);

    if (!user) throw new HttpException('user_not_found', 404);

    const source = await this.sourceService.findOne(sourceId);

    if (!source) throw new HttpException('source_not_found', 404);

    const tag = await this.tagService.findOne(tagId);

    if (!tag) throw new HttpException('tag_not_found', 404);

    try {
      await this.prisma.revenue.create({
        data: {
          name: createRevenueDto.name,
          coin: createRevenueDto.coin,
          value: createRevenueDto.value,
          sourceId: sourceId,
          tagId: tagId,
          payMethod: createRevenueDto.payMethod.toString(),
          typeRevenue: createRevenueDto.typeRevenue.toString(),
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

      const revenues = await this.prisma.revenue.findMany({
        where: {
          name: where.name,
          value: where.value,
          tagId: where.tagId,
          payMethod: where.payMethod.toString(),
          typeRevenue: where.typeRevenue.toString(),
          date: {
            gte: where.startDate,
            lte: where.endDate,
          },
          AND: {
            userId,
          },
        },
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

  async findOne(id: string): Promise<Revenue> {
    try {
      const revenue = await this.prisma.revenue.findUnique({
        where: {
          id,
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

  async update(id: string, updateRevenueDto: UpdateRevenueDto): Promise<any> {
    const { sourceId, tagId } = updateRevenueDto;

    try {
      const revenue = await this.prisma.revenue.findUnique({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!revenue) throw new HttpException('Revenue not found', 404);

      const source = await this.sourceService.findOne(sourceId);

      if (!source) throw new HttpException('source_not_found', 404);

      const tag = await this.tagService.findOne(tagId);

      if (!tag) throw new HttpException('tag_not_found', 404);

      await this.prisma.revenue.update({
        where: {
          id,
        },
        data: {
          name: updateRevenueDto.name,
          coin: updateRevenueDto.coin,
          value: new Decimal(updateRevenueDto.value),
          date: updateRevenueDto.date,
          description: updateRevenueDto.description,
          payMethod: updateRevenueDto.payMethod.toString(),
          typeRevenue: updateRevenueDto.typeRevenue.toString(),
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
        if (entity.typeRevenue === TypeRevenue.EXPENSE.toString()) {
          value = amount - Number(entity.value);
        }
        if (entity.typeRevenue === TypeRevenue.INCOMING.toString()) {
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
          if (entity.typeRevenue === TypeRevenue.EXPENSE.toString()) {
            return total + Number(entity.value);
          }
          return total;
        },
        0,
      );

      const totalIncomings = revenues.reduce(
        (total: number, entity: Revenue) => {
          if (entity.typeRevenue === TypeRevenue.INCOMING.toString()) {
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
          if (entity.typeRevenue === TypeRevenue.EXPENSE.toString()) {
            accumulator.push(Number(entity.value));
          }
          return accumulator;
        },
        [],
      );

      const listIncomings = revenues.reduce(
        (accumulator: number[], entity: Revenue) => {
          if (entity.typeRevenue === TypeRevenue.INCOMING.toString()) {
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
      const where = pageOptionsDto;
      const userId = convertToken(context);

      const revenues = await this.prisma.revenue.findMany({
        where: {
          name: where.name,
          value: where.value,
          tagId: where.tagId,
          payMethod: where.payMethod.toString(),
          typeRevenue: where.typeRevenue.toString(),
          date: {
            gte: where.startDate,
            lte: where.endDate,
          },
          userId,
          deletedAt: null,
        },
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
          if (entity.typeRevenue === TypeRevenue.EXPENSE.toString()) {
            accumulator.push(Number(entity.value) * -1);
          }
          if (entity.typeRevenue === TypeRevenue.INCOMING.toString()) {
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

  private buildWhere(options: WhereDto, deteleted = false) {
    let whereString = '';
    const values = {};

    if (options.name && options.name != '') {
      whereString += `revenue.name like :name`;

      values['name'] = `%${options.name}%`;
    }

    if (options.payMethod) {
      const condition = `revenue.payMethod = :payMethod`;

      whereString.length > 0
        ? (whereString += ` AND ${condition}`)
        : (whereString = `${condition}`);

      values['payMethod'] = options.payMethod;
    }

    if (options.typeRevenue) {
      const condition = `revenue.typeRevenue = :typeRevenue`;

      whereString.length > 0
        ? (whereString += ` AND ${condition}`)
        : (whereString = `${condition}`);

      values['typeRevenue'] = options.typeRevenue;
    }

    if (options.tagId) {
      const condition = `revenue.tagId = :tagId`;

      whereString.length > 0
        ? (whereString += ` AND ${condition}`)
        : (whereString = `${condition}`);

      values['tagId'] = options.tagId;
    }

    if (options.value) {
      const condition = `revenue.value = :value`;

      whereString.length > 0
        ? (whereString += ` AND ${condition}`)
        : (whereString = `${condition}`);

      values['value'] = options.value;
    }

    if (options.startDate && !options.endDate) {
      const condition = `revenue.date >= :startDate`;

      whereString.length > 0
        ? (whereString += ` AND ${condition}`)
        : (whereString = `${condition}`);

      values['startDate'] = options.startDate;
    }

    if (!options.startDate && options.endDate) {
      const condition = `revenue.date <= :endDate`;

      whereString.length > 0
        ? (whereString += ` AND ${condition}`)
        : (whereString = `${condition}`);

      values['endDate'] = options.endDate;
    }

    if (options.startDate && options.endDate) {
      const condition = `revenue.date >= :startDate AND revenue.date <= :endDate`;

      whereString.length > 0
        ? (whereString += ` AND ${condition}`)
        : (whereString = `${condition}`);

      values['startDate'] = options.startDate;
      values['endDate'] = options.endDate;
    }

    if (!deteleted) {
      const condition = `revenue.deletedAt is null`;

      whereString.length > 0
        ? (whereString += ` AND ${condition}`)
        : (whereString = `${condition}`);
    }

    return {
      whereString,
      values,
    };
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
  }
}
