import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Educacion } from './entities/educacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Educacion]),
  ],
  exports: [TypeOrmModule],
})
export class EducacionModule {}