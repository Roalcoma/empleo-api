// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PerfilesModule } from './perfiles/perfiles.module';
import { AplicacionesModule } from './aplicaciones/aplicaciones.module';
import { OfertasLaboralesModule } from './ofertas-laborales/ofertas-laborales.module';

// ¡CORRECCIÓN! Importa el archivo correcto
import databaseConfig from './database/database.config'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig], // Carga la configuración con la etiqueta 'database'
    }),
    
    TypeOrmModule.forRootAsync({
      // imports: [ConfigModule], // ¡ELIMINA ESTA LÍNEA! No es necesaria.
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.get('database');
        if (!databaseConfig) {
          throw new Error('Database configuration is not defined');
        }
        return databaseConfig; // Ahora sí encontrará la configuración
      },
    }),

    UsersModule,
    PerfilesModule,
    AplicacionesModule,
    OfertasLaboralesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}