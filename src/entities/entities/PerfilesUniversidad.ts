import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Usuarios } from "../../users/entities/Usuarios";

@Index("perfiles_universidad_pkey", ["id"], { unique: true })
@Index("perfiles_universidad_usuario_id_key", ["usuarioId"], { unique: true })
@Entity("perfiles_universidad", { schema: "public" })
export class PerfilesUniversidad {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("uuid", { name: "usuario_id", unique: true })
  usuarioId: string;

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

  @OneToOne(() => Usuarios, (usuarios) => usuarios.perfilesUniversidad, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "usuario_id", referencedColumnName: "id" }])
  usuario: Usuarios;
}
