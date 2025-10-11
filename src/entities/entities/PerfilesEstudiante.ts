import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Aplicaciones } from "./Aplicaciones";
import { Usuarios } from "./Usuarios";

@Index("perfiles_estudiante_pkey", ["idPerfilEstudiante"], { unique: true })
@Index("perfiles_estudiante_id_usuario_key", ["idUsuario"], { unique: true })
@Entity("perfiles_estudiante", { schema: "public" })
export class PerfilesEstudiante {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_perfil_estudiante" })
  idPerfilEstudiante: number;

  @Column("integer", { name: "id_usuario", unique: true })
  idUsuario: number;

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

  @OneToMany(
    () => Aplicaciones,
    (aplicaciones) => aplicaciones.idPerfilEstudiante2
  )
  aplicaciones: Aplicaciones[];

  @OneToOne(() => Usuarios, (usuarios) => usuarios.perfilesEstudiante, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  idUsuario2: Usuarios;
}
