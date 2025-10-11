import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OfertasLaborales } from "./OfertasLaborales";
import { Usuarios } from "../../users/entities/Usuarios";

@Index("perfiles_empresa_pkey", ["idPerfilEmpresa"], { unique: true })
@Index("perfiles_empresa_id_usuario_key", ["idUsuario"], { unique: true })
@Index("perfiles_empresa_rif_key", ["rif"], { unique: true })
@Entity("perfiles_empresa", { schema: "public" })
export class PerfilesEmpresa {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_perfil_empresa" })
  idPerfilEmpresa: number;

  @Column("integer", { name: "id_usuario", unique: true })
  idUsuario: number;

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
    (ofertasLaborales) => ofertasLaborales.idPerfilEmpresa
  )
  ofertasLaborales: OfertasLaborales[];

  @OneToOne(() => Usuarios, (usuarios) => usuarios.perfilEmpresa, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  idUsuario2: Usuarios;
}
