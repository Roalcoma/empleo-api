import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { OfertasLaborales } from "./OfertasLaborales";
import { Usuarios } from "../../users/entities/Usuarios";

@Index("perfiles_empresa_pkey", ["id"], { unique: true })
@Index("perfiles_empresa_rif_key", ["rif"], { unique: true })
@Index("perfiles_empresa_usuario_id_key", ["usuarioId"], { unique: true })
@Entity("perfiles_empresa", { schema: "public" })
export class PerfilesEmpresa {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("uuid", { name: "usuario_id", unique: true })
  usuarioId: string;

  @Column("character varying", { name: "nombre_empresa", length: 255 })
  nombreEmpresa: string;

  @Column("character varying", {
    name: "rif",
    nullable: true,
    unique: true,
    length: 20,
  })
  rif: string | null;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("character varying", {
    name: "url_sitio_web",
    nullable: true,
    length: 255,
  })
  urlSitioWeb: string | null;

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
    () => OfertasLaborales,
    (ofertasLaborales) => ofertasLaborales.empresa
  )
  ofertasLaborales: OfertasLaborales[];

  @OneToOne(() => Usuarios, (usuarios) => usuarios.perfilesEmpresa, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "usuario_id", referencedColumnName: "id" }])
  usuario: Usuarios;
}
