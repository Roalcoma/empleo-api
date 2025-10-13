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
    findAll() {
        return this.usersService.findAll();
    }

    @Get()
    findOne(@Query('idUsuario') id: number) {
        return this.usersService.findOne(id);
    }

    @Post('registro')
    registro(@Body() CreateUsuarioDto: CreateUsuarioDto) {
        const usuarioCreado = this.usersService.create(CreateUsuarioDto);

        return {
            success: true,
            message: 'Usuario creado exitosamente',
            usuario: usuarioCreado
        }
    }
}
