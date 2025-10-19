// src/perfiles/dto/create-update-perfil.dto.ts

import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUpdatePerfilDto {
  @IsString()
  @IsOptional()
  tituloProfesional?: string;

  @IsString()
  @IsOptional()
  resumen?: string;

  @IsUrl({}, { message: 'La URL del CV no es válida.' })
  @IsOptional()
  urlCv?: string;

  @IsArray()
  @IsString({ each: true }) // Valida que cada elemento del array sea un string
  @IsOptional()
  habilidades?: string[];
}