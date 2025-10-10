// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigModule y ConfigService
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // 1. Carga el módulo de configuración de forma global
    ConfigModule.forRoot({
      isGlobal: true, // Hace que .env esté disponible en toda la aplicación
    }),
    
    // 2. Configura TypeORM de forma asíncrona
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importa ConfigModule para poder usar ConfigService
      inject: [ConfigService], // Inyecta el servicio de configuración
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'), // El '+' convierte el string a número
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        //synchronize: true, // Recuerda: solo para desarrollo
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}