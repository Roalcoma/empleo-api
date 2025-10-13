import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller({
    path: 'usuarios',
    version: '1'
})
export class UsersController {
    constructor(private readonly usersService: UsersService) {}


    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Get()
    async findOne(@Query('idUsuario') id: number) {
        return this.usersService.findOne(id);
    }

    @Post('registro')
    async registro(@Body() CreateUsuarioDto: CreateUsuarioDto) {
        const usuarioCreado = await this.usersService.create(CreateUsuarioDto);

        console.log('Controller:', usuarioCreado);

        return {
            success: true,
            message: 'Usuario creado exitosamente',
            usuario: usuarioCreado
        }
    }
}
