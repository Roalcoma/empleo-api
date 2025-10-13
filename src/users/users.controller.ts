import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
        const usuarios = await this.usersService.findAll();

        return {
            success: true,
            message: 'Usuarios obtenidos exitosamente',
            usuarios
        }
    }

    @Get(':id')
    async findOne(@Param('idUsuario') id: number) {
        const usuario = await this.usersService.findOne(id);

        return {
            success: true,
            message: 'Usuario obtenido exitosamente',
            usuario
        }
    }

    @Post()
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
