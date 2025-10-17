import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Perfiles } from "./Perfiles";

@Index("experiencias_laborales_pkey", ["idExperienciaLaboral"], {
  unique: true,
})
@Entity("experiencias_laborales", { schema: "public" })
export class ExperienciasLaborales {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_experiencia_laboral" })
  idExperienciaLaboral: number;

  @Column("character varying", { name: "cargo", length: 255 })
  cargo: string;

  @Column("character varying", { name: "nombre_empresa", length: 255 })
  nombreEmpresa: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("date", { name: "fecha_inicio" })
  fechaInicio: string;

  @Column("date", { name: "fecha_fin", nullable: true })
  fechaFin: string | null;

  @ManyToOne(() => Perfiles, (perfiles) => perfiles.experienciasLaborales, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_perfil", referencedColumnName: "idPerfil" }])
  idPerfil: Perfiles;
}
