import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Pessoa } from "./Pessoa";
import { Saida } from "./Saida";

@Index("comprador_pkey", ["idComprador"], { unique: true })
@Entity("comprador", { schema: "public" })
export class Comprador {
  @Column("integer", { primary: true, name: "id_comprador" })
  idComprador: number;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.compradors)
  @JoinColumn([{ name: "pessoa_id_pessoa", referencedColumnName: "idPessoa" }])
  pessoaIdPessoa: Pessoa;

  @OneToMany(() => Saida, (saida) => saida.idComprador)
  saidas: Saida[];
}
