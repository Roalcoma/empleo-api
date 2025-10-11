import { Column, Entity, Index, OneToOne } from "typeorm";
import { PerfilesEmpresa } from "../../entities/entities/PerfilesEmpresa";
import { PerfilesEstudiante } from "../../entities/entities/PerfilesEstudiante";
import { PerfilesUniversidad } from "../../entities/entities/PerfilesUniversidad";

@Index("idx_usuarios_email", ["email"], { unique: true })
@Index("usuarios_email_key", ["email"], { unique: true })
@Index("usuarios_pkey", ["id"], { unique: true })
@Entity("usuarios", { schema: "public" })
export class Usuarios {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("text", { name: "clave_hash" })
  claveHash: string;

  @Column("enum", {
    name: "rol",
    enum: ["estudiante", "empresa", "universidad", "administrador"],
  })
  rol: "estudiante" | "empresa" | "universidad" | "administrador";

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

  @OneToOne(() => PerfilesEmpresa, (perfilesEmpresa) => perfilesEmpresa.usuario)
  perfilesEmpresa: PerfilesEmpresa;

  @OneToOne(
    () => PerfilesEstudiante,
    (perfilesEstudiante) => perfilesEstudiante.usuario
  )
  perfilesEstudiante: PerfilesEstudiante;

  @OneToOne(
    () => PerfilesUniversidad,
    (perfilesUniversidad) => perfilesUniversidad.usuario
  )
  perfilesUniversidad: PerfilesUniversidad;
}
