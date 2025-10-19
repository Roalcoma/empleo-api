import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuarios.entity';
import { UsersController } from './usuarios.controller';
import { UsersService } from './usuarios.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuarios]) 
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], 
})
export class UsersModule {}
