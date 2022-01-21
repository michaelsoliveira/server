import { Column, Entity, Index, OneToMany } from "typeorm";
import { Comprador } from "./Comprador";

@Index("pessoa_pkey", ["idPessoa"], { unique: true })
@Entity("pessoa", { schema: "public" })
export class Pessoa {
  @Column("integer", { primary: true, name: "id_pessoa" })
  idPessoa: number;

  @Column("character varying", { name: "bairro", nullable: true, length: 50 })
  bairro: string | null;

  @Column("character varying", { name: "cep", nullable: true, length: 15 })
  cep: string | null;

  @Column("character varying", { name: "cnf_cnpj", nullable: true, length: 20 })
  cnfCnpj: string | null;

  @Column("character varying", { name: "endereco", nullable: true, length: 50 })
  endereco: string | null;

  @Column("character varying", { name: "estado", nullable: true, length: 50 })
  estado: string | null;

  @Column("character varying", {
    name: "municipio",
    nullable: true,
    length: 50,
  })
  municipio: string | null;

  @Column("character varying", { name: "nome", nullable: true, length: 50 })
  nome: string | null;

  @Column("character varying", { name: "numero", nullable: true, length: 50 })
  numero: string | null;

  @Column("character varying", {
    name: "pessoa_tipo",
    nullable: true,
    length: 50,
  })
  pessoaTipo: string | null;

  @OneToMany(() => Comprador, (comprador) => comprador.pessoaIdPessoa)
  compradors: Comprador[];
}
