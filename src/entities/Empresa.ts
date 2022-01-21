import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Umf } from "./Umf";

@Index("empresa_pkey", ["idEmpresa"], { unique: true })
@Entity("empresa", { schema: "public" })
export class Empresa {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_empresa" })
  idEmpresa: string;

  @Column("character varying", { name: "razao_social", length: 50 })
  razaoSocial: string;

  @Column("character varying", {
    name: "nome_fantasia",
    nullable: true,
    length: 40,
  })
  nomeFantasia: string | null;

  @Column("character varying", { name: "cnpj", nullable: true, length: 14 })
  cnpj: string | null;

  @Column("character varying", {
    name: "reg_ambiental",
    nullable: true,
    length: 50,
  })
  regAmbiental: string | null;

  @Column("character varying", { name: "telefone", nullable: true, length: 10 })
  telefone: string | null;

  @Column("character varying", { name: "endereco", nullable: true, length: 60 })
  endereco: string | null;

  @Column("character varying", {
    name: "complemento",
    nullable: true,
    length: 40,
  })
  complemento: string | null;

  @Column("character varying", { name: "cep", nullable: true, length: 8 })
  cep: string | null;

  @Column("character varying", {
    name: "municipio",
    nullable: true,
    length: 30,
  })
  municipio: string | null;

  @Column("character varying", { name: "estado", nullable: true, length: 2 })
  estado: string | null;

  @Column("character varying", { name: "contato", nullable: true, length: 50 })
  contato: string | null;

  @Column("character varying", {
    name: "resp_tecnico",
    nullable: true,
    length: 50,
  })
  respTecnico: string | null;

  @Column("character varying", {
    name: "crea_resp",
    nullable: true,
    length: 50,
  })
  creaResp: string | null;

  @Column("integer", { name: "dmin_relatorio", nullable: true })
  dminRelatorio: number | null;

  @Column("integer", { name: "intervalo_dmin_relatorio", nullable: true })
  intervaloDminRelatorio: number | null;

  @OneToMany(() => Umf, (umf) => umf.idEmpresa)
  umfs: Umf[];
}
