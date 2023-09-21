import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto, UpdateUserResponse } from '../dto/update-user.dto';
import { CreatedEntity, DeletedEntity } from 'src/common/dto/default-responses';
import { convertToken, handleErrors } from 'src/common/services/common.service';
import { GetUserResponse } from '../dto/get-user.dto';
import { compare, hash } from 'bcrypt';
import { Resend } from 'resend';
import { ValidatedUserWithCodeDTO } from '../dto/validate-recover-code';
import { JwtService } from '@nestjs/jwt';
import {
  RecoverPasswordDTO,
  RecoverPasswordResponse,
} from '../dto/recover-password';

@Injectable()
export class UserService {
  private logger = new Logger(User.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private resend = new Resend(process.env.RESEND_SECRET);

  async create(createUserDto: CreateUserDto): Promise<CreatedEntity> {
    try {
      const { password } = createUserDto;
      const hashedPassword = await this.hashPassword(password);

      createUserDto.password = hashedPassword;

      const user = this.usersRepository.create(createUserDto);

      this.usersRepository.save(user);

      this.logger.debug('User created successfully');

      return { message: `User ${user.name} created successfully` };
    } catch (e: any) {
      handleErrors(e.message, e.code);
    }
  }

  async findById(id: string): Promise<GetUserResponse> {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id,
          deletedAt: IsNull(),
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
      const user = await this.usersRepository.findOne({
        where: {
          id,
          deletedAt: IsNull(),
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
      const user = await this.usersRepository.findOneBy({ login });

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
      const user = await this.usersRepository.findOne({
        where: {
          id,
          deletedAt: IsNull(),
        },
      });

      if (!user) throw new HttpException('user_not_found', 404);

      user.name = updateUserDto.name;
      user.email = updateUserDto.email;
      user.login = updateUserDto.login;
      user.password = updateUserDto.password;
      user.updatedAt = new Date();

      await this.usersRepository.update(id, user);

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

  async softDelete(id: string): Promise<DeletedEntity> {
    try {
      const user = await this.usersRepository.findOneBy({ id }).then((user) => {
        user.deletedAt = new Date();
        return this.usersRepository.save(user);
      });

      return { message: `User ${user.name} deleted successfully` };
    } catch (e) {
      handleErrors(e.message, e.code);
    }
  }

  async getRecoverCode(email: string): Promise<void> {
    const recoverCode = this.generateCode();

    const user = await this.usersRepository.findOne({
      where: {
        email,
        deletedAt: IsNull(),
      },
    });

    if (!user) throw new HttpException('user_not_found', 404);

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
      this.logger.error('Error durring sending email');
    }

    user.recoverCode = recoverCode;
    this.usersRepository.save(user);
  }

  async validateRecoverCode(
    recoverCode: string,
  ): Promise<ValidatedUserWithCodeDTO> {
    const user = await this.usersRepository.findOne({
      where: {
        recoverCode,
        deletedAt: IsNull(),
      },
    });

    if (!user) throw new HttpException('user_not_found', 404);

    user.recoverCode = null;
    this.usersRepository.save(user);

    const payload = { username: user.login, sub: user.id, coin: user.coin };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET,
      }),
    };
  }

  async recoverPassword(
    recover: RecoverPasswordDTO,
    request: any,
  ): Promise<RecoverPasswordResponse> {
    const { newPassword } = recover;
    const userId = convertToken(request);

    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
        deletedAt: IsNull(),
      },
    });

    if (!user) throw new HttpException('user_not_found', 404);

    const newHashedPassword = await this.hashPassword(newPassword);

    if (user.password === newHashedPassword) {
      throw new HttpException('user_new_password_equal_old_password', 500);
    }

    user.password = newHashedPassword;

    await this.usersRepository.save(user);

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
    const saltRounds = 10; // Number of salt rounds for bcrypt
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
