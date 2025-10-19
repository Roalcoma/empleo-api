import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity'; // Asegúrate de importar tu entidad Usuarios

export const GetUser = createParamDecorator(
    (data: keyof Usuarios, ctx: ExecutionContext) => { // 'data' puede ser una clave de Usuarios
        const req = ctx.switchToHttp().getRequest();
        const user = req.user as Usuarios; // Asignamos el tipo correcto

        if (!user) {
            throw new InternalServerErrorException('Usuario no encontrado en la petición (Revisar AuthGuard/JwtStrategy)');
        }

        // Si se pide una propiedad específica (ej: @GetUser('email')), la devuelve.
        // Si no se pide nada (@GetUser()), devuelve el objeto usuario completo.
        return data ? user[data] : user;
    }
);