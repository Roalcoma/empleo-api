import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/Usuarios';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuarios]) // ¡CRÍTICO! Esto le da al módulo acceso al Repositorio de Usuario.
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
