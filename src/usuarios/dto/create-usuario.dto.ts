// src/users/dto/create-usuario.dto.ts

import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

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
  @IsOptional() // El teléfono sigue siendo opcional
  telefono?: string;
}