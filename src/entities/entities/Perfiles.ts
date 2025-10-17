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
import { Educacion } from "./Educacion";
import { ExperienciasLaborales } from "./ExperienciasLaborales";
import { Usuarios } from "./Usuarios";

@Index("perfiles_pkey", ["idPerfil"], { unique: true })
@Index("perfiles_id_usuario_key", ["idUsuario"], { unique: true })
@Entity("perfiles", { schema: "public" })
export class Perfiles {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_perfil" })
  idPerfil: number;

  @Column("integer", { name: "id_usuario", unique: true })
  idUsuario: number;

  @Column("character varying", {
    name: "titulo_profesional",
    nullable: true,
    length: 255,
  })
  tituloProfesional: string | null;

  @Column("text", { name: "resumen", nullable: true })
  resumen: string | null;

  @Column("character varying", { name: "url_cv", nullable: true, length: 255 })
  urlCv: string | null;

  @Column("text", { name: "habilidades", nullable: true, array: true })
  habilidades: string[] | null;

  @OneToMany(() => Aplicaciones, (aplicaciones) => aplicaciones.idPerfil2)
  aplicaciones: Aplicaciones[];

  @OneToMany(() => Educacion, (educacion) => educacion.idPerfil)
  educacions: Educacion[];

  @OneToMany(
    () => ExperienciasLaborales,
    (experienciasLaborales) => experienciasLaborales.idPerfil
  )
  experienciasLaborales: ExperienciasLaborales[];

  @OneToOne(() => Usuarios, (usuarios) => usuarios.perfiles, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  idUsuario2: Usuarios;
}
