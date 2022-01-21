import { Column, Entity, Index, OneToMany } from "typeorm";
import { Poa } from "./Poa";

@Index("situacao_poa_pkey", ["idSituacao"], { unique: true })
@Entity("situacao_poa", { schema: "public" })
export class SituacaoPoa {
  @Column("bigint", { primary: true, name: "id_situacao" })
  idSituacao: string;

  @Column("character varying", { name: "situacao", nullable: true, length: 21 })
  situacao: string | null;

  @OneToMany(() => Poa, (poa) => poa.idSituacao)
  poas: Poa[];
}
