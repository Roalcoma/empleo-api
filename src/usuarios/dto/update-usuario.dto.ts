// src/users/dto/update-usuario.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

// PartialType hace que todas las propiedades de CreateUsuarioDto sean opcionales.
// ¡No necesitas volver a escribir todas las validaciones!
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}