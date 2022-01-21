import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TipoMotorista } from "./TipoMotorista";
import { Saida } from "./Saida";

@Index("motorista_pkey", ["idMotorista"], { unique: true })
@Entity("motorista", { schema: "public" })
export class Motorista {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_motorista" })
  idMotorista: string;

  @Column("character varying", { name: "nome", nullable: true, length: 55 })
  nome: string | null;

  @Column("character varying", {
    name: "endereco",
    nullable: true,
    length: 250,
  })
  endereco: string | null;

  @Column("character varying", { name: "telefone", nullable: true, length: 10 })
  telefone: string | null;

  @Column("character varying", { name: "celular", nullable: true, length: 11 })
  celular: string | null;

  @Column("character varying", {
    name: "habilitacao",
    nullable: true,
    length: 20,
  })
  habilitacao: string | null;

  @ManyToOne(() => TipoMotorista, (tipoMotorista) => tipoMotorista.motoristas)
  @JoinColumn([{ name: "id_tipo", referencedColumnName: "idTipo" }])
  idTipo: TipoMotorista;

  @OneToMany(() => Saida, (saida) => saida.idMotorista)
  saidas: Saida[];
}
