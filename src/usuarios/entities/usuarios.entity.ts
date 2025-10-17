import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OfertasLaborales } from "src/ofertas-laborales/entities/ofertasLaborales.entity";
import { Perfiles } from "src/perfiles/entities/perfiles.entity";
import { UsuariosEmpresas } from "./usuariosEmpresas.entity";

@Index("usuarios_email_key", ["email"], { unique: true })
@Index("usuarios_pkey", ["idUsuario"], { unique: true })
@Index("usuarios_nombre_usuario_key", ["nombreUsuario"], { unique: true })
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
    () => OfertasLaborales,
    (ofertasLaborales) => ofertasLaborales.idUsuarioPublicador
  )
  ofertasLaborales: OfertasLaborales[];

  @OneToOne(() => Perfiles, (perfiles) => perfiles.usuario)
  perfiles: Perfiles;

  @OneToMany(
    () => UsuariosEmpresas,
    (usuariosEmpresas) => usuariosEmpresas.idUsuario2
  )
  usuariosEmpresas: UsuariosEmpresas[];
}
