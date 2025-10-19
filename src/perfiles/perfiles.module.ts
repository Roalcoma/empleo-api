// src/perfiles/perfiles.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfiles } from './entities/perfiles.entity'; // Revisa la ruta
import { PerfilesService } from './perfiles.service';
import { PerfilesController } from './perfiles.controller';

@Module({
  imports: [
    // ¡Aquí se registra la entidad!
    TypeOrmModule.forFeature([Perfiles]),
  ],
  exports: [TypeOrmModule],
  providers: [PerfilesService],
  controllers: [PerfilesController],
})
export class PerfilesModule {}