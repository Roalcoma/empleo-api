import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { PerfilesEstudiante } from "./PerfilesEstudiante";
import { OfertasLaborales } from "./OfertasLaborales";

@Index(
  "aplicaciones_estudiante_id_oferta_id_key",
  ["estudianteId", "ofertaId"],
  { unique: true }
)
@Index("aplicaciones_pkey", ["id"], { unique: true })
@Entity("aplicaciones", { schema: "public" })
export class Aplicaciones {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("uuid", { name: "estudiante_id", unique: true })
  estudianteId: string;

  @Column("uuid", { name: "oferta_id", unique: true })
  ofertaId: string;

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
    () => PerfilesEstudiante,
    (perfilesEstudiante) => perfilesEstudiante.aplicaciones,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "estudiante_id", referencedColumnName: "id" }])
  estudiante: PerfilesEstudiante;

  @ManyToOne(
    () => OfertasLaborales,
    (ofertasLaborales) => ofertasLaborales.aplicaciones,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "oferta_id", referencedColumnName: "id" }])
  oferta: OfertasLaborales;
}
