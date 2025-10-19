// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/usuarios/usuarios.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    // 1. Importamos UsersModule para poder inyectar UsersService
    UsersModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // 2. Configuramos el JwtModule para que sepa cómo firmar los tokens
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '3600s',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  // 3. Proveemos el AuthService y nuestra JwtStrategy para que la app los use
  providers: [AuthService, JwtStrategy],
  // 4. Exportamos la configuración de Passport y la estrategia para que los Guards funcionen
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}