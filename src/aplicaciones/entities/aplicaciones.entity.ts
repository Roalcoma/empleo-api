// src/aplicaciones/entities/aplicacion.entity.ts

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OfertasLaborales } from "src/ofertas-laborales/entities/ofertasLaborales.entity";
import { Perfiles } from "src/perfiles/entities/perfiles.entity";

@Index("aplicaciones_pkey", ["idAplicacion"], { unique: true })
@Index(
  "idx_aplicaciones_perfil_oferta_unique", // Renombrado para mayor claridad
  ["perfil", "ofertaLaboral"], // ¡CORRECCIÓN! El índice de unicidad debe usar los nombres de las propiedades de la relación
  { unique: true }
)
@Entity("aplicaciones", { schema: "public" })
export class Aplicaciones {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_aplicacion" })
  idAplicacion: number;

  // @Column(...) <--- Se elimina la columna idPerfil redundante.
  // @Column(...) <--- Se elimina la columna idOfertaLaboral redundante.

  @Column("enum", {
    name: "estado",
    enum: ["enviada", "vista", "en_proceso", "rechazada", "contratado"],
    default: () => "'enviada'",
  })
  estado: "enviada" | "vista" | "en_proceso" | "rechazada" | "contratado";

  @Column("timestamp with time zone", {
    name: "fecha_aplicacion",
    default: () => "now()",
  })
  fechaAplicacion: Date;

  // --- RELACIÓN CON OFERTAS LABORALES (CORREGIDA) ---
  @ManyToOne(
    () => OfertasLaborales,
    (ofertasLaborales) => ofertasLaborales.aplicaciones,
    { onDelete: "CASCADE", nullable: false } // Es buena práctica añadir nullable: false
  )
  @JoinColumn({ name: "id_oferta_laboral", referencedColumnName: "idOfertaLaboral" })
  ofertaLaboral: OfertasLaborales; // Propiedad renombrada

  // --- RELACIÓN CON PERFILES (CORREGIDA) ---
  @ManyToOne(() => Perfiles, (perfiles) => perfiles.aplicaciones, {
    onDelete: "CASCADE", nullable: false
  })
  @JoinColumn({ name: "id_perfil", referencedColumnName: "idPerfil" })
  perfil: Perfiles; // Propiedad renombrada
}