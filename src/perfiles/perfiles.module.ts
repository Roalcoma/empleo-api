// src/perfiles/perfiles.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfiles } from './entities/perfiles.entity'; // Revisa la ruta

@Module({
  imports: [
    // ¡Aquí se registra la entidad!
    TypeOrmModule.forFeature([Perfiles]),
  ],
  exports: [TypeOrmModule],
})
export class PerfilesModule {}