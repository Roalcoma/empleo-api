// src/perfiles/perfiles.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Importa TODAS tus entidades de perfil
import { PerfilesEmpresa } from '../entities/entities/PerfilesEmpresa';
import { PerfilesEstudiante } from '../entities/entities/PerfilesEstudiante';
import { PerfilesUniversidad } from '../entities/entities/PerfilesUniversidad';

@Module({
  imports: [
    // Registra las tres entidades para que TypeORM las conozca
    TypeOrmModule.forFeature([
      PerfilesEmpresa,
      PerfilesEstudiante,
      PerfilesUniversidad,
    ]),
  ],
  // Puedes exportar el TypeOrmModule para que otros módulos que importen PerfilesModule
  // tengan acceso a estos repositorios automáticamente.
  exports: [TypeOrmModule],
})
export class PerfilesModule {}