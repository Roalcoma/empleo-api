import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienciasLaborales } from './entities/experienciasLaborales.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExperienciasLaborales]),
  ],
  exports: [TypeOrmModule],
})
export class ExperienciasLaboralesModule {}