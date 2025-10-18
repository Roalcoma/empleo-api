import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

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
}
