import { AuthDto, AuthResponse } from '../dto/auth.dto';
import { UserService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(authDto: AuthDto): Promise<AuthResponse>;
}
