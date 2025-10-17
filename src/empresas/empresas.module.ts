// src/empresas/empresas.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresas } from './entities/empresas.entity';// Revisa que la ruta sea correcta

@Module({
  imports: [
    // ¡Aquí se registra la última entidad!
    TypeOrmModule.forFeature([Empresas]),
  ],
  exports: [TypeOrmModule],
})
export class EmpresasModule {}