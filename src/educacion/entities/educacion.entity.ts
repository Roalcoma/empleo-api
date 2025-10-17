// src/educacion/entities/educacion.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Perfiles } from "src/perfiles/entities/perfiles.entity";

@Index("educacion_pkey", ["idEducacion"], { unique: true })
@Entity("educacion", { schema: "public" })
export class Educacion {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_educacion" })
  idEducacion: number;

  @Column("character varying", { name: "institucion", length: 255 })
  institucion: string;

  @Column("character varying", { name: "titulo", length: 255 })
  titulo: string;

  @Column("character varying", {
    name: "campo_de_estudio",
    nullable: true,
    length: 255,
  })
  campoDeEstudio: string | null;

  @Column("date", { name: "fecha_inicio" })
  fechaInicio: string;

  @Column("date", { name: "fecha_fin", nullable: true })
  fechaFin: string | null;

  // --- ÚNICA Y CORRECTA DEFINICIÓN DE LA RELACIÓN ---
  @ManyToOne(() => Perfiles, (perfil) => perfil.educaciones, { // La flecha apunta a 'educaciones'
    onDelete: "CASCADE",
    nullable: false, // Es buena práctica que una educación siempre tenga un perfil
  })
  @JoinColumn({ name: "id_perfil", referencedColumnName: "idPerfil" }) // Le dice cómo conectar las tablas
  perfil: Perfiles;
  
  // Se eliminó la propiedad redundante 'idPerfil'
}