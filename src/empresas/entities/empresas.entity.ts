import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OfertasLaborales } from "../../ofertas-laborales/entities/ofertasLaborales.entity";
import { UsuariosEmpresas } from "../../usuarios-empresas/entities/usuariosEmpresas.entity";

@Index("empresas_pkey", ["idEmpresa"], { unique: true })
@Index("empresas_nombre_empresa_key", ["nombreEmpresa"], { unique: true })
@Index("empresas_rif_key", ["rif"], { unique: true })
@Entity("empresas", { schema: "public" })
export class Empresas {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_empresa" })
  idEmpresa: number;

  @Column("character varying", {
    name: "nombre_empresa",
    unique: true,
    length: 255,
  })
  nombreEmpresa: string;

  @Column("character varying", {
    name: "rif",
    nullable: true,
    unique: true,
    length: 20,
  })
  rif: string | null;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("character varying", {
    name: "url_sitio_web",
    nullable: true,
    length: 255,
  })
  urlSitioWeb: string | null;

  @OneToMany(
    () => OfertasLaborales,
    (ofertasLaborales) => ofertasLaborales.idEmpresa
  )
  ofertasLaborales: OfertasLaborales[];

  @OneToMany(
    () => UsuariosEmpresas,
    (usuariosEmpresas) => usuariosEmpresas.idEmpresa2
  )
  usuariosEmpresas: UsuariosEmpresas[];
}
