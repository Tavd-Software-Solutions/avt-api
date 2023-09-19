import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto, UpdateUserResponse } from '../dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreatedEntity, DeletedEntity } from 'src/common/dto/default-responses';
import { GetUserResponse } from '../dto/get-user.dto';
import { ValidatedUserWithCodeDTO } from '../dto/validate-recover-code';
import { JwtService } from '@nestjs/jwt';
import { RecoverPasswordDTO, RecoverPasswordResponse } from '../dto/recover-password';
export declare class UserService {
    private usersRepository;
    private jwtService;
    private logger;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    private resend;
    create(createUserDto: CreateUserDto): Promise<CreatedEntity>;
    findById(id: string): Promise<GetUserResponse>;
    findOne(id: string): Promise<User>;
    findByLogin(login: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateUserResponse>;
    softDelete(id: string): Promise<DeletedEntity>;
    getRecoverCode(email: string): Promise<void>;
    validateRecoverCode(recoverCode: string): Promise<ValidatedUserWithCodeDTO>;
    recoverPassword(recover: RecoverPasswordDTO, request: any): Promise<RecoverPasswordResponse>;
    protected generateCode(): string;
    hashPassword(password: string): Promise<string>;
    isPasswordsEqual(password: string, hashedPassword: string): Promise<boolean>;
}
