import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEducacionDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la institución es requerido.' })
  institucion: string;

  @IsString()
  @IsNotEmpty({ message: 'El título obtenido es requerido.' })
  titulo: string;

  @IsString()
  @IsOptional()
  campoDeEstudio?: string;

  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida (YYYY-MM-DD).' })
  @IsNotEmpty({ message: 'La fecha de inicio es requerida.' })
  fechaInicio: string; // TypeORM maneja la conversión a Date

  @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida (YYYY-MM-DD).' })
  @IsOptional()
  fechaFin?: string; // TypeORM maneja la conversión a Date
}