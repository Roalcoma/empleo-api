import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Aplicaciones } from "src/aplicaciones/entities/aplicaciones.entity";
import { Empresas } from "../../empresas/entities/empresas.entity";
import { Usuarios } from "src/usuarios/entities/usuarios.entity";

@Index("ofertas_laborales_pkey", ["idOfertaLaboral"], { unique: true })
@Entity("ofertas_laborales", { schema: "public" })
export class OfertasLaborales {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_oferta_laboral" })
  idOfertaLaboral: number;

  @Column("character varying", { name: "titulo", length: 255 })
  titulo: string;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @Column("enum", { name: "tipo", enum: ["pasantia", "empleo", "freelance"] })
  tipo: "pasantia" | "empleo" | "freelance";

  @Column("character varying", {
    name: "ubicacion",
    nullable: true,
    length: 255,
  })
  ubicacion: string | null;

  @Column("enum", {
    name: "estado",
    enum: ["abierta", "cerrada"],
    default: () => "'abierta'",
  })
  estado: "abierta" | "cerrada";

  @OneToMany(
    () => Aplicaciones,
    (aplicaciones) => aplicaciones.ofertaLaboral
  )
  aplicaciones: Aplicaciones[];

  @ManyToOne(() => Empresas, (empresas) => empresas.ofertasLaborales, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_empresa", referencedColumnName: "idEmpresa" }])
  idEmpresa: Empresas;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.ofertasLaborales)
  @JoinColumn([
    { name: "id_usuario_publicador", referencedColumnName: "idUsuario" },
  ])
  idUsuarioPublicador: Usuarios;
}
