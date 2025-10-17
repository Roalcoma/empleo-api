import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OfertasLaborales } from "./OfertasLaborales";
import { Perfiles } from "./Perfiles";

@Index("aplicaciones_pkey", ["idAplicacion"], { unique: true })
@Index(
  "aplicaciones_id_perfil_id_oferta_laboral_key",
  ["idOfertaLaboral", "idPerfil"],
  { unique: true }
)
@Entity("aplicaciones", { schema: "public" })
export class Aplicaciones {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_aplicacion" })
  idAplicacion: number;

  @Column("integer", { name: "id_perfil", unique: true })
  idPerfil: number;

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

  @ManyToOne(
    () => OfertasLaborales,
    (ofertasLaborales) => ofertasLaborales.aplicaciones,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_oferta_laboral", referencedColumnName: "idOfertaLaboral" },
  ])
  idOfertaLaboral2: OfertasLaborales;

  @ManyToOne(() => Perfiles, (perfiles) => perfiles.aplicaciones, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_perfil", referencedColumnName: "idPerfil" }])
  idPerfil2: Perfiles;
}
