import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "../../users/entities/Usuarios";

@Index("perfiles_universidad_pkey", ["idPerfilUniversidad"], { unique: true })
@Index("perfiles_universidad_id_usuario_key", ["idUsuario"], { unique: true })
@Entity("perfiles_universidad", { schema: "public" })
export class PerfilesUniversidad {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_perfil_universidad" })
  idPerfilUniversidad: number;

  @Column("integer", { name: "id_usuario", unique: true })
  idUsuario: number;

  @Column("character varying", { name: "nombre_universidad", length: 255 })
  nombreUniversidad: string;

  @Column("character varying", { name: "siglas", nullable: true, length: 20 })
  siglas: string | null;

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

  @OneToOne(() => Usuarios, (usuarios) => usuarios.perfilUniversidad, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  idUsuario2: Usuarios;
}
