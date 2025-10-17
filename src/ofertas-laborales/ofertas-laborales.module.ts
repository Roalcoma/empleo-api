// src/ofertas-laborales/ofertas-laborales.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertasLaborales } from './entities/ofertasLaborales.entity'; // Revisa que la ruta sea correcta

@Module({
  imports: [
    // ¡Aquí se registra la entidad!
    TypeOrmModule.forFeature([OfertasLaborales]),
  ],
  exports: [TypeOrmModule],
})
export class OfertasLaboralesModule {}