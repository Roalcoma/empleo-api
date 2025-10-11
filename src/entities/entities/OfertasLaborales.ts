import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Aplicaciones } from "./Aplicaciones";
import { PerfilesEmpresa } from "./PerfilesEmpresa";

@Index("ofertas_laborales_pkey", ["idOfertaLaboral"], { unique: true })
@Entity("ofertas_laborales", { schema: "public" })
export class OfertasLaborales {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_oferta_laboral" })
  idOfertaLaboral: number;

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

  @OneToMany(
    () => Aplicaciones,
    (aplicaciones) => aplicaciones.idOfertaLaboral2
  )
  aplicaciones: Aplicaciones[];

  @ManyToOne(
    () => PerfilesEmpresa,
    (perfilesEmpresa) => perfilesEmpresa.ofertasLaborales,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_perfil_empresa", referencedColumnName: "idPerfilEmpresa" },
  ])
  idPerfilEmpresa: PerfilesEmpresa;
}
