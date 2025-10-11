import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OfertasLaborales } from "./OfertasLaborales";
import { PerfilesEstudiante } from "./PerfilesEstudiante";

@Index("aplicaciones_pkey", ["idAplicacion"], { unique: true })
@Index(
  "aplicaciones_id_perfil_estudiante_id_oferta_laboral_key",
  ["idOfertaLaboral", "idPerfilEstudiante"],
  { unique: true }
)
@Entity("aplicaciones", { schema: "public" })
export class Aplicaciones {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_aplicacion" })
  idAplicacion: number;

  @Column("integer", { name: "id_perfil_estudiante", unique: true })
  idPerfilEstudiante: number;

  @Column("integer", { name: "id_oferta_laboral", unique: true })
  idOfertaLaboral: number;

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

  @Column("timestamp with time zone", {
    name: "creado_en",
    default: () => "now()",
  })
  creadoEn: Date;

  @Column("timestamp with time zone", {
    name: "actualizado_en",
    default: () => "now()",
  })
  actualizadoEn: Date;

  @ManyToOne(
    () => OfertasLaborales,
    (ofertasLaborales) => ofertasLaborales.aplicaciones,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_oferta_laboral", referencedColumnName: "idOfertaLaboral" },
  ])
  idOfertaLaboral2: OfertasLaborales;

  @ManyToOne(
    () => PerfilesEstudiante,
    (perfilesEstudiante) => perfilesEstudiante.aplicaciones,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([
    {
      name: "id_perfil_estudiante",
      referencedColumnName: "idPerfilEstudiante",
    },
  ])
  idPerfilEstudiante2: PerfilesEstudiante;
}
