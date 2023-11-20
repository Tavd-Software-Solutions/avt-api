import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto, UpdateUserResponse } from '../dto/update-user.dto';
import {
  convertToken,
  handleErrors,
} from '../../common/services/common.service';
import { GetUserResponse } from '../dto/get-user.dto';
import { Resend } from 'resend';
import { ValidatedUserWithCodeDTO } from '../dto/validate-recover-code';
import { JwtService } from '@nestjs/jwt';
import {
  RecoverPasswordDTO,
  RecoverPasswordResponse,
} from '../dto/recover-password';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class UserService {
  private logger = new Logger('User');

  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  private resend = new Resend("re_7dAqg21i_DS6dKxG4bvqAnRHP3mD43G9z");

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const { password } = createUserDto;
      const hashedPassword = await this.hashPassword(password);

      const newUser = {
        ...createUserDto,
        password: hashedPassword,
        recoverCode: null,
      };

      const user = await this.prisma.user.create({
        data: newUser,
      });

      this.logger.debug('User created successfully');

      return { message: `User ${newUser.name} created successfully` };
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async findById(id: string): Promise<GetUserResponse> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!user) throw new HttpException('user_not_found', 404);

      return {
        name: user.name,
        email: user.email,
        login: user.login,
        coin: user.coin,
      };
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!user) throw new HttpException('user_not_found', 404);

      return user;
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async findByLogin(login: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          login,
          deletedAt: null,
        },
      });

      if (!user) throw new HttpException('user_not_found', 404);

      return user;
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!user) throw new HttpException('user_not_found', 404);

      user.name = updateUserDto.name;
      user.email = updateUserDto.email;
      user.login = updateUserDto.login;
      user.password = updateUserDto.password;
      user.updatedAt = new Date();

      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...user,
        },
      });

      this.logger.debug('User updated successfully');

      return {
        name: user.name,
        email: user.email,
        login: user.login,
        coin: user.coin,
      };
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async softDelete(id: string): Promise<any> {
    try {
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return { message: `User ${user.name} deleted successfully` };
    } catch (e) {
      handleErrors(e.message, e.code);
    }
  }

  async getRecoverCode(email: string): Promise<void> {
    const recoverCode = this.generateCode();

    await this.prisma.user.findUniqueOrThrow({
      where: {
        email,
        deletedAt: null,
      },
    });

    try {
      await this.resend.emails
        .send({
          from: 'onboarding@resend.dev',
          to: [email],
          subject: 'Recuperar senha:',
          html: `
          <h3>Este é o seu código para recuperação de senha:</h3>
            <p>${recoverCode}</p>
          `,
        })
        .then((response) => {
          this.logger.log(`Email sent successfully: ${response.id}`);
        })
        .catch((error) => {
          throw new HttpException('error_recover_password', 500);
        });
    } catch (e) {
      if ((e.code = 'P2025')) {
        throw new HttpException('user_not_found', 404);
      }
      this.logger.error('Error durring sending email');
    }

    await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        recoverCode,
      },
    });
  }

  async validateRecoverCode(
    recoverCode: string,
  ): Promise<ValidatedUserWithCodeDTO> {
    const user = await this.prisma.user.findUnique({
      where: {
        recoverCode,
        deletedAt: null,
      },
    });

    if (!user) throw new HttpException('user_not_found', 404);

    await this.prisma.user.update({
      where: {
        recoverCode,
      },
      data: {
        recoverCode: null,
      },
    });

    const payload = { username: user.login, sub: user.id, coin: user.coin };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: "GSJFDHG827FSDBNGLKWY0R982423TKJGHWS98R7-254",
      }),
    };
  }

  async recoverPassword(
    recover: RecoverPasswordDTO,
    request: any,
  ): Promise<RecoverPasswordResponse> {
    const { newPassword } = recover;
    const userId = convertToken(request);

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
        deletedAt: null,
      },
    });

    if (!user) throw new HttpException('user_not_found', 404);

    const newHashedPassword = await this.hashPassword(newPassword);

    if (user.password === newHashedPassword) {
      throw new HttpException('user_new_password_equal_old_password', 500);
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newHashedPassword,
      },
    });
    return {
      message: 'Password updated successfully',
    };
  }

  /**
   * HELPERS
   */

  protected generateCode(): string {
    return (Math.random() + 1).toString(36).substring(5);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  }

  async isPasswordsEqual(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}
