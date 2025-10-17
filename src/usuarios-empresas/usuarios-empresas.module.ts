// src/usuarios-empresas/usuarios-empresas.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosEmpresas } from './entities/usuariosEmpresas.entity'; // Revisa que la ruta sea correcta

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuariosEmpresas]),
  ],
  exports: [TypeOrmModule],
})
export class UsuariosEmpresasModule {}