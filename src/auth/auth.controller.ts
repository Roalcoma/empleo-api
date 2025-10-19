import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller({
    path: 'auth',
    version: '1'
})
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: any) {
        const resultado = await this.authService.login(loginDto);

        return resultado;
    }

    @Get('perfil')
    @UseGuards(AuthGuard('jwt'))
    obtenerPerfil(@Req() req: any) {

        return {
            success: true,
            message: 'Perfil obtenido exitosamente',
            usuario: req.user
        }
    }
}
