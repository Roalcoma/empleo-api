import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Perfiles } from "./Perfiles";

@Index("educacion_pkey", ["idEducacion"], { unique: true })
@Entity("educacion", { schema: "public" })
export class Educacion {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_educacion" })
  idEducacion: number;

  @Column("character varying", { name: "institucion", length: 255 })
  institucion: string;

  @Column("character varying", { name: "titulo", length: 255 })
  titulo: string;

  @Column("character varying", {
    name: "campo_de_estudio",
    nullable: true,
    length: 255,
  })
  campoDeEstudio: string | null;

  @Column("date", { name: "fecha_inicio" })
  fechaInicio: string;

  @Column("date", { name: "fecha_fin", nullable: true })
  fechaFin: string | null;

  @ManyToOne(() => Perfiles, (perfiles) => perfiles.educacions, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_perfil", referencedColumnName: "idPerfil" }])
  idPerfil: Perfiles;
}
