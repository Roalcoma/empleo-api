// src/aplicaciones/aplicaciones.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aplicaciones } from '../entities/entities/Aplicaciones'; // Revisa que la ruta sea correcta

@Module({
  imports: [
    // ¡Aquí está la magia! Registramos la entidad Aplicaciones.
    TypeOrmModule.forFeature([Aplicaciones]),
  ],
  exports: [TypeOrmModule],
})
export class AplicacionesModule {}