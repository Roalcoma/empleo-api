import { Body, Controller, Get, Param, Post, Patch, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

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
    async findOne(@Param('id', ParseIntPipe) id: number) {
        console.log('ID recibido en el controlador:', id);

        const usuario = await this.usersService.findOne(id);

        if (!usuario) {
            return {
                success: false,
                message: 'Usuario no encontrado',
            }
        }

        return {
            success: true,
            message: 'Usuario obtenido exitosamente',
            usuario: usuario
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

    @Patch(':id') // 👈 Define el método PATCH y captura un parámetro de ruta 'id'
    async update(
        @Param('id') id: number, // Extrae el 'id' de la URL y valida que sea un número
        @Body() updateUsuarioDto: UpdateUsuarioDto,
    ) {
        const updatedUser = await this.usersService.update(id, updateUsuarioDto);

        return {
            success: true,
            message: 'Usuario actualizado exitosamente',
            usuario: updatedUser,
        };
    }
}
