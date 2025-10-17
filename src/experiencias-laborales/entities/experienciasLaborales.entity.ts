// src/experiencias-laborales/entities/experiencias-laborales.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Perfiles } from "src/perfiles/entities/perfiles.entity";

@Index("experiencias_laborales_pkey", ["idExperienciaLaboral"], {
  unique: true,
})
@Entity("experiencias_laborales", { schema: "public" })
export class ExperienciasLaborales {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_experiencia_laboral" })
  idExperienciaLaboral: number;

  @Column("character varying", { name: "cargo", length: 255 })
  cargo: string;

  @Column("character varying", { name: "nombre_empresa", length: 255 })
  nombreEmpresa: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("date", { name: "fecha_inicio" })
  fechaInicio: string;

  @Column("date", { name: "fecha_fin", nullable: true })
  fechaFin: string | null;

  // --- RELACIÓN CORREGIDA Y UNIFICADA ---
  @ManyToOne(() => Perfiles, (perfil) => perfil.experienciasLaborales, {
    onDelete: "CASCADE",
    nullable: false, // Una experiencia siempre debe pertenecer a un perfil
  })
  @JoinColumn({ name: "id_perfil", referencedColumnName: "idPerfil" })
  perfil: Perfiles; // Propiedad renombrada para mayor claridad e intuición
}