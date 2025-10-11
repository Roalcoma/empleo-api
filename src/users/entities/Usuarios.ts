import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PerfilesEmpresa } from "../../entities/entities/PerfilesEmpresa";
import { PerfilesEstudiante } from "../../entities/entities/PerfilesEstudiante";
import { PerfilesUniversidad } from "../../entities/entities/PerfilesUniversidad";

@Index("usuarios_email_key", ["email"], { unique: true })
@Index("idx_usuarios_email", ["email"], { unique: true })
@Index("usuarios_pkey", ["idUsuario"], { unique: true })
@Index("usuarios_nombre_usuario_key", ["nombreUsuario"], { unique: true })
@Index("idx_usuarios_nombre_usuario", ["nombreUsuario"], { unique: true })
@Entity("usuarios", { schema: "public" })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_usuario" })
  idUsuario: number;

  @Column("character varying", {
    name: "nombre_usuario",
    unique: true,
    length: 50,
  })
  nombreUsuario: string;

  @Column("character varying", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("text", { name: "clave_hash" })
  claveHash: string;

  @Column("character varying", { name: "nombre", length: 100 })
  nombre: string;

  @Column("character varying", { name: "apellido", length: 100 })
  apellido: string;

  @Column("character varying", { name: "telefono", nullable: true, length: 50 })
  telefono: string | null;

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

  @OneToOne(
    () => PerfilesEmpresa,
    (perfilesEmpresa) => perfilesEmpresa.idUsuario2
  )
  perfilesEmpresa: PerfilesEmpresa;

  @OneToOne(
    () => PerfilesEstudiante,
    (perfilesEstudiante) => perfilesEstudiante.idUsuario2
  )
  perfilesEstudiante: PerfilesEstudiante;

  @OneToOne(
    () => PerfilesUniversidad,
    (perfilesUniversidad) => perfilesUniversidad.idUsuario2
  )
  perfilesUniversidad: PerfilesUniversidad;
}
