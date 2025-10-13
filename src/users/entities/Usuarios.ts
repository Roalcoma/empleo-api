import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PerfilesEmpresa } from "../../entities/entities/PerfilesEmpresa"; // Rutas corregidas por convención
import { PerfilesEstudiante } from "../../entities/entities/PerfilesEstudiante";
import { PerfilesUniversidad } from "../../entities/entities/PerfilesUniversidad";


export type RolUsuario = 'estudiante' | 'empresa' | 'universidad' | 'administrador';

@Index("usuarios_pkey", ["idUsuario"], { unique: true })
@Entity("usuarios", { schema: "public" })
export class Usuarios { // Renombrada a singular por convención
  @PrimaryGeneratedColumn({ type: "integer", name: "id_usuario" })
  idUsuario: number;

  @Column("character varying", { name: "nombre_usuario", unique: true, length: 50 })
  nombreUsuario: string;

  @Column("character varying", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("text", { name: "clave_hash", select: false }) // Añadido select: false por seguridad
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

  @Column("timestamp with time zone", { name: "creado_en", default: () => "now()" })
  creadoEn: Date;

  @Column("timestamp with time zone", { name: "actualizado_en", default: () => "now()" })
  actualizadoEn: Date;

  // --- RELACIONES CORREGIDAS ---
  @OneToOne(() => PerfilesEmpresa, (perfil) => perfil.idUsuario)
  perfilEmpresa: PerfilesEmpresa;

  @OneToOne(() => PerfilesEstudiante, (perfil) => perfil.idUsuario)
  perfilEstudiante: PerfilesEstudiante;

  @OneToOne(() => PerfilesUniversidad, (perfil) => perfil.idUsuario)
  perfilUniversidad: PerfilesUniversidad;
}