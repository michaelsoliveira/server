import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Saida } from "./Saida";

@Index("caminhao_pkey", ["idVeiculo"], { unique: true })
@Entity("veiculo", { schema: "public" })
export class Veiculo {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_veiculo" })
  idVeiculo: string;

  @Column("character varying", { name: "placa", nullable: true, length: 8 })
  placa: string | null;

  @Column("character varying", {
    name: "descricao",
    nullable: true,
    length: 250,
  })
  descricao: string | null;

  @OneToMany(() => Saida, (saida) => saida.idVeiculo)
  saidas: Saida[];
}
