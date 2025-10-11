import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Aplicaciones } from "./Aplicaciones";
import { PerfilesEmpresa } from "./PerfilesEmpresa";

@Index("ofertas_laborales_pkey", ["id"], { unique: true })
@Entity("ofertas_laborales", { schema: "public" })
export class OfertasLaborales {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "titulo", length: 255 })
  titulo: string;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @Column("enum", { name: "tipo", enum: ["pasantia", "empleo"] })
  tipo: "pasantia" | "empleo";

  @Column("character varying", {
    name: "ubicacion",
    nullable: true,
    length: 255,
  })
  ubicacion: string | null;

  @Column("enum", {
    name: "estado",
    enum: ["abierta", "cerrada"],
    default: () => "'abierta'",
  })
  estado: "abierta" | "cerrada";

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

  @OneToMany(() => Aplicaciones, (aplicaciones) => aplicaciones.oferta)
  aplicaciones: Aplicaciones[];

  @ManyToOne(
    () => PerfilesEmpresa,
    (perfilesEmpresa) => perfilesEmpresa.ofertasLaborales,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "empresa_id", referencedColumnName: "id" }])
  empresa: PerfilesEmpresa;
}
