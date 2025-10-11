import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Aplicaciones } from "./Aplicaciones";
import { Usuarios } from "../../users/entities/Usuarios";

@Index("perfiles_estudiante_pkey", ["id"], { unique: true })
@Index("perfiles_estudiante_usuario_id_key", ["usuarioId"], { unique: true })
@Entity("perfiles_estudiante", { schema: "public" })
export class PerfilesEstudiante {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("uuid", { name: "usuario_id", unique: true })
  usuarioId: string;

  @Column("character varying", { name: "nombres", length: 100 })
  nombres: string;

  @Column("character varying", { name: "apellidos", length: 100 })
  apellidos: string;

  @Column("character varying", {
    name: "universidad",
    nullable: true,
    length: 255,
  })
  universidad: string | null;

  @Column("character varying", { name: "carrera", nullable: true, length: 255 })
  carrera: string | null;

  @Column("integer", { name: "semestre", nullable: true })
  semestre: number | null;

  @Column("character varying", { name: "url_cv", nullable: true, length: 255 })
  urlCv: string | null;

  @Column("text", { name: "habilidades", nullable: true, array: true })
  habilidades: string[] | null;

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

  @OneToMany(() => Aplicaciones, (aplicaciones) => aplicaciones.estudiante)
  aplicaciones: Aplicaciones[];

  @OneToOne(() => Usuarios, (usuarios) => usuarios.perfilesEstudiante, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "usuario_id", referencedColumnName: "id" }])
  usuario: Usuarios;
}
