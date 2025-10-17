import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Empresas } from "../../empresas/entities/empresas.entity";
import { Usuarios } from "./Usuarios";

@Index("usuarios_empresas_pkey", ["idEmpresa", "idUsuario"], { unique: true })
@Entity("usuarios_empresas", { schema: "public" })
export class UsuariosEmpresas {
  @Column("integer", { primary: true, name: "id_usuario" })
  idUsuario: number;

  @Column("integer", { primary: true, name: "id_empresa" })
  idEmpresa: number;

  @Column("enum", { name: "rol", enum: ["administrador", "reclutador"] })
  rol: "administrador" | "reclutador";

  @ManyToOne(() => Empresas, (empresas) => empresas.usuariosEmpresas, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_empresa", referencedColumnName: "idEmpresa" }])
  idEmpresa2: Empresas;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.usuariosEmpresas, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  idUsuario2: Usuarios;
}
