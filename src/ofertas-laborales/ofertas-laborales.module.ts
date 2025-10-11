// src/ofertas-laborales/ofertas-laborales.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertasLaborales } from '../entities/entities/OfertasLaborales'; // Revisa que la ruta sea correcta

@Module({
  imports: [
    // ¡Conectamos la última pieza al sistema!
    TypeOrmModule.forFeature([OfertasLaborales]),
  ],
  exports: [TypeOrmModule],
})
export class OfertasLaboralesModule {}