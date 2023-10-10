import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Request,
} from '@nestjs/common';
import { UserService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserResponse } from './dto/update-user.dto';
import { Public } from '../../src/auth/decorators/auth.decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserResponse } from './dto/get-user.dto';
import { GetRecoverCodeDTO } from './dto/get-recover-code.dto';
import {
  ValidateRecoverCodeDTO,
  ValidatedUserWithCodeDTO,
} from './dto/validate-recover-code';
import {
  RecoverPasswordDTO,
  RecoverPasswordResponse,
} from './dto/recover-password';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Public()
  @Post('create')
  @ApiResponse({ status: 201 })
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.usersService.create(createUserDto);
  }

  @Get('get/:id')
  @ApiResponse({ status: 200, type: GetUserResponse })
  async findOne(@Param('id') id: string): Promise<GetUserResponse> {
    return await this.usersService.findById(id);
  }

  @Put('edit/:id')
  @ApiResponse({ status: 200, type: UpdateUserResponse })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200 })
  async delete(@Param('id') id: string): Promise<any> {
    return await this.usersService.softDelete(id);
  }

  @Public()
  @Post('get-recover-code')
  @ApiResponse({ status: 200 })
  async getRecoverCode(
    @Body() recoverPassword: GetRecoverCodeDTO,
  ): Promise<void> {
    return await this.usersService.getRecoverCode(recoverPassword.email);
  }

  @Public()
  @Post('validate-recover-code')
  @ApiResponse({ status: 200 })
  async validateRecoverCode(
    @Body() { recoverCode }: ValidateRecoverCodeDTO,
  ): Promise<ValidatedUserWithCodeDTO> {
    return await this.usersService.validateRecoverCode(recoverCode);
  }

  @Post('recover-password')
  @ApiResponse({ status: 200 })
  async recoverPassword(
    @Body() recover: RecoverPasswordDTO,
    @Request() request: any,
  ): Promise<RecoverPasswordResponse> {
    return await this.usersService.recoverPassword(recover, request);
  }
}
