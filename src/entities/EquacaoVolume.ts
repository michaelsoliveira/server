import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("equacao_pkey", ["idEquacao"], { unique: true })
@Entity("equacao_volume", { schema: "public" })
export class EquacaoVolume {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_equacao" })
  idEquacao: string;

  @Column("character varying", { name: "nome", nullable: true, length: 50 })
  nome: string | null;

  @Column("character varying", {
    name: "observacao",
    nullable: true,
    length: 200,
  })
  observacao: string | null;

  @Column("character varying", {
    name: "expressao",
    nullable: true,
    length: 1000,
  })
  expressao: string | null;
}
