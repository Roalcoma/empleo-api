// src/aplicaciones/aplicaciones.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aplicaciones } from './entities/aplicaciones.entity';// Revisa que la ruta sea correcta

@Module({
  imports: [
    TypeOrmModule.forFeature([Aplicaciones]),
  ],
  exports: [TypeOrmModule],
})
export class AplicacionesModule {}