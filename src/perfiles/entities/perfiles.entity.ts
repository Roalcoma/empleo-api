// src/perfiles/entities/perfiles.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Aplicaciones } from "src/aplicaciones/entities/aplicaciones.entity";
import { Educacion } from "src/educacion/entities/educacion.entity";
import { ExperienciasLaborales } from "src/experiencias-laborales/entities/experienciasLaborales.entity";
import { Usuarios } from "src/usuarios/entities/usuarios.entity";

@Index("perfiles_pkey", ["idPerfil"], { unique: true })
// El índice de unicidad en id_usuario se maneja directamente en la relación
@Entity("perfiles", { schema: "public" })
export class Perfiles {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_perfil" })
  idPerfil: number;

  // @Column("integer", { name: "id_usuario", unique: true }) // <--- Se elimina esta propiedad redundante
  // idUsuario: number;

  @Column("character varying", {
    name: "titulo_profesional",
    nullable: true,
    length: 255,
  })
  tituloProfesional: string | null;

  @Column("text", { name: "resumen", nullable: true })
  resumen: string | null;

  @Column("character varying", { name: "url_cv", nullable: true, length: 255 })
  urlCv: string | null;

  @Column("text", { name: "habilidades", nullable: true, array: true })
  habilidades: string[] | null;

  @OneToMany(() => Aplicaciones, (aplicaciones) => aplicaciones.perfil)
  aplicaciones: Aplicaciones[];

  // --- CORRECCIÓN DE TIPEO ---
  @OneToMany(() => Educacion, (educacion) => educacion.perfil)
  educaciones: Educacion[]; // Corregido de 'educacions' a 'educaciones'

  // --- CORRECCIÓN DE RELACIÓN ---
  @OneToMany(
    () => ExperienciasLaborales,
    (experiencia) => experiencia.perfil // Debe apuntar a la propiedad 'perfil' en la otra entidad
  )
  experienciasLaborales: ExperienciasLaborales[];

  // --- UNIFICACIÓN DE RELACIÓN CON USUARIOS ---
  @OneToOne(() => Usuarios, (usuario) => usuario.perfiles, { // Asumo que en la entidad Usuarios la propiedad se llama 'perfil'
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "id_usuario", referencedColumnName: "idUsuario" })
  usuario: Usuarios; // Renombrado para mayor claridad
}