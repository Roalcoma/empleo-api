// src/users/dto/create-usuario.dto.ts

import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import type { RolUsuario } from '../entities/usuarios.entity';


export class CreateUsuarioDto {
  @IsString({ message: 'El nombre de usuario debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío.' })
  nombreUsuario: string;

  @IsEmail({}, { message: 'El formato del email no es válido.' })
  @IsNotEmpty({ message: 'El email no puede estar vacío.' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'La clave debe tener al menos 8 caracteres.' })
  @IsNotEmpty({ message: 'La clave no puede estar vacía.' })
  clave: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido no puede estar vacío.' })
  apellido: string;
  
  @IsString()
  @IsOptional() // Hacemos el teléfono opcional
  telefono?: string;

  @IsEnum(['estudiante', 'empresa', 'universidad'], { 
    message: 'El rol no es válido. Debe ser estudiante, empresa o universidad.' 
  })
  @IsNotEmpty({ message: 'El rol no puede estar vacío.' })
  rol: RolUsuario;
}