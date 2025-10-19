// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './usuarios/usuarios.module';
import { PerfilesModule } from './perfiles/perfiles.module';
import { AplicacionesModule } from './aplicaciones/aplicaciones.module';
import { OfertasLaboralesModule } from './ofertas-laborales/ofertas-laborales.module';
import { EmpresasModule } from './empresas/empresas.module';
import { EducacionModule } from './educacion/educacion.module';
import { ExperienciasLaboralesModule } from './experiencias-laborales/experiencias-laborales.module';
import { UsuariosEmpresasModule } from './usuarios-empresas/usuarios-empresas.module';
import { AuthModule } from './auth/auth.module';
import { ExperienciasLaboralesService } from './experiencias-laborales/experiencias-laborales.service';
import { ExperienciasLaboralesController } from './experiencias-laborales/experiencias-laborales.controller';
import { EducacionService } from './educacion/educacion.service';
import { EducacionController } from './educacion/educacion.controller';

import databaseConfig from './database/database.config'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    
    TypeOrmModule.forRootAsync({
      // imports: [ConfigModule], // ¡LÍNEA ELIMINADA!
      inject: [ConfigService],
      // La fábrica ahora es más simple. Si 'database' no existe, NestJS lanzará un error claro.
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.get('database');
        if (!databaseConfig) {
          throw new Error('Database configuration is missing');
        }
        return databaseConfig;
      },
    }),

    // Asegúrate de que TODOS tus módulos estén aquí
    UsersModule,
    PerfilesModule,
    AplicacionesModule,
    OfertasLaboralesModule,
    EmpresasModule,
    EducacionModule,
    ExperienciasLaboralesModule,
    UsuariosEmpresasModule,
    AuthModule
  ],
  controllers: [AppController, ExperienciasLaboralesController, EducacionController],
  providers: [AppService, ExperienciasLaboralesService, EducacionService],
})
export class AppModule {}