import { Controller, Get, UseGuards, Req, NotFoundException, Put, Body } from '@nestjs/common';
import { PerfilesService } from './perfiles.service';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateUpdatePerfilDto } from './dto/create-update-perfil.dto';

@Controller({
    path: 'perfiles',
    version: '1',
})
export class PerfilesController {
    constructor(private readonly perfilesService: PerfilesService) {}

    @Get('mi-perfil')
    @UseGuards(AuthGuard('jwt'))
    async obtenerMiPerfil(@Req() req): Promise<any> {
        const usuarioLogueado: Usuarios = req.user;

        if (!usuarioLogueado || !usuarioLogueado.idUsuario) {
            throw new NotFoundException('Usuario no autenticado');
        }

        try {
            const perfil = await this.perfilesService.encontrarPerfilPorId(usuarioLogueado.idUsuario);

            return {
                success: true,
                mensaje: 'Perfil obtenido exitosamente',
                perfil: perfil,
            }
        } catch (error) {
            // Manejo específico si el perfil no existe
            if (error instanceof NotFoundException) {
                return {
                    success: false,
                    message: error.message,
                    data: null // O un objeto vacío, según prefieras
                };
            }
            // Re-lanzar otros errores inesperados
            throw error;
        }

    }

    @Put('mi-perfil')
    @UseGuards(AuthGuard('jwt'))
    async createOrUpdateMyProfile(
        @Req() req: any,
        @Body() dto: CreateUpdatePerfilDto,
    ) {
        const usuarioLogueado: Usuarios = req.user;
        const perfil = await this.perfilesService.createOrUpdateMyProfile(usuarioLogueado, dto);
        
        return {
            success: true,
            message: 'Perfil guardado exitosamente.',
            data: perfil,
        };
    }
}
