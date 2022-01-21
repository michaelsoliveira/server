import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Empresa } from "./Empresa";
import { Upa } from "./Upa";

@Index("umf_pkey", ["idUmf"], { unique: true })
@Entity("umf", { schema: "public" })
export class Umf {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_umf" })
  idUmf: string;

  @Column("character varying", { name: "nome", length: 50 })
  nome: string;

  @Column("character varying", {
    name: "municipio",
    nullable: true,
    length: 30,
  })
  municipio: string | null;

  @Column("character varying", { name: "estado", nullable: true, length: 2 })
  estado: string | null;

  @Column("character varying", {
    name: "localizacao",
    nullable: true,
    length: 50,
  })
  localizacao: string | null;

  @ManyToOne(() => Empresa, (empresa) => empresa.umfs, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_empresa", referencedColumnName: "idEmpresa" }])
  idEmpresa: Empresa;

  @OneToMany(() => Upa, (upa) => upa.idUmf)
  upas: Upa[];
}
