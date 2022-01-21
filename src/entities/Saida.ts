import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comprador } from "./Comprador";
import { DestinoTora } from "./DestinoTora";
import { Motorista } from "./Motorista";
import { Poa } from "./Poa";
import { Veiculo } from "./Veiculo";
import { Tora } from "./Tora";

@Index("saida_pkey", ["idSaida"], { unique: true })
@Entity("saida", { schema: "public" })
export class Saida {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_saida" })
  idSaida: string;

  @Column("date", { name: "data_saida", nullable: true })
  dataSaida: string | null;

  @Column("character varying", { name: "dof", nullable: true, length: 40 })
  dof: string | null;

  @Column("character varying", { name: "nf", nullable: true, length: 40 })
  nf: string | null;

  @Column("date", { name: "data_vencimento_dof", nullable: true })
  dataVencimentoDof: string | null;

  @Column("character varying", { name: "agf", nullable: true, length: 40 })
  agf: string | null;

  @Column("date", { name: "data_vencimento_agf", nullable: true })
  dataVencimentoAgf: string | null;

  @ManyToOne(() => Comprador, (comprador) => comprador.saidas)
  @JoinColumn([{ name: "id_comprador", referencedColumnName: "idComprador" }])
  idComprador: Comprador;

  @ManyToOne(() => DestinoTora, (destinoTora) => destinoTora.saidas)
  @JoinColumn([{ name: "id_destino", referencedColumnName: "idDestino" }])
  idDestino: DestinoTora;

  @ManyToOne(() => Motorista, (motorista) => motorista.saidas)
  @JoinColumn([{ name: "id_motorista", referencedColumnName: "idMotorista" }])
  idMotorista: Motorista;

  @ManyToOne(() => Poa, (poa) => poa.saidas)
  @JoinColumn([{ name: "id_poa", referencedColumnName: "idPoa" }])
  idPoa: Poa;

  @ManyToOne(() => Veiculo, (veiculo) => veiculo.saidas)
  @JoinColumn([{ name: "id_veiculo", referencedColumnName: "idVeiculo" }])
  idVeiculo: Veiculo;

  @OneToMany(() => Tora, (tora) => tora.idSaida)
  toras: Tora[];
}
