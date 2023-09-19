import { UserService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserResponse } from './dto/update-user.dto';
import { CreatedEntity, DeletedEntity } from 'src/common/dto/default-responses';
import { GetUserResponse } from './dto/get-user.dto';
import { GetRecoverCodeDTO } from './dto/get-recover-code.dto';
import { ValidateRecoverCodeDTO, ValidatedUserWithCodeDTO } from './dto/validate-recover-code';
import { RecoverPasswordDTO, RecoverPasswordResponse } from './dto/recover-password';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UserService);
    create(createUserDto: CreateUserDto): Promise<CreatedEntity>;
    findOne(id: string): Promise<GetUserResponse>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateUserResponse>;
    delete(id: string): Promise<DeletedEntity>;
    getRecoverCode(recoverPassword: GetRecoverCodeDTO): Promise<void>;
    validateRecoverCode({ recoverCode }: ValidateRecoverCodeDTO): Promise<ValidatedUserWithCodeDTO>;
    recoverPassword(recover: RecoverPasswordDTO, request: any): Promise<RecoverPasswordResponse>;
}
