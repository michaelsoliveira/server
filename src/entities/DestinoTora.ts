import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TipoDestino } from "./TipoDestino";
import { Saida } from "./Saida";
import { Tora } from "./Tora";

@Index("destino_tora_pkey", ["idDestino"], { unique: true })
@Index("uk_jc1a8o2ukiaktxugqwmmtgv81", ["nome"], { unique: true })
@Entity("destino_tora", { schema: "public" })
export class DestinoTora {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_destino" })
  idDestino: string;

  @Column("character varying", {
    name: "descricao",
    nullable: true,
    length: 40,
  })
  descricao: string | null;

  @Column("timestamp without time zone", {
    name: "data_atualizacao",
    nullable: true,
  })
  dataAtualizacao: Date | null;

  @Column("timestamp without time zone", {
    name: "data_cadastro",
    nullable: true,
  })
  dataCadastro: Date | null;

  @Column("character varying", {
    name: "nome",
    nullable: true,
    unique: true,
    length: 50,
  })
  nome: string | null;

  @ManyToOne(() => TipoDestino, (tipoDestino) => tipoDestino.destinoToras)
  @JoinColumn([
    { name: "id_tipo_destino", referencedColumnName: "idTipoDestino" },
  ])
  idTipoDestino: TipoDestino;

  @OneToMany(() => Saida, (saida) => saida.idDestino)
  saidas: Saida[];

  @OneToMany(() => Tora, (tora) => tora.idDestino)
  toras: Tora[];
}
