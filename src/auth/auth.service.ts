import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/usuarios/usuarios.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async login(LoginDto: LoginAuthDto) {
        const {username, clave} = LoginDto;

        const usuario = await this.usersService.findByUsernameOrEmail(username)

        if (!usuario || !(await bcrypt.compare(clave, usuario.claveHash))) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = { sub: usuario.idUsuario, username: usuario.nombreUsuario };

        const token = this.jwtService.sign(payload);

        return {
            success: true,
            message: 'Inicio de sesión exitoso',
            token
        }
    }
}
