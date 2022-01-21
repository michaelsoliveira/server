import { Column, Entity, Index, OneToMany } from "typeorm";
import { Motorista } from "./Motorista";

@Index("tipo_motorista_pkey", ["idTipo"], { unique: true })
@Entity("tipo_motorista", { schema: "public" })
export class TipoMotorista {
  @Column("bigint", { primary: true, name: "id_tipo" })
  idTipo: string;

  @Column("character varying", {
    name: "descricao",
    nullable: true,
    length: 30,
  })
  descricao: string | null;

  @OneToMany(() => Motorista, (motorista) => motorista.idTipo)
  motoristas: Motorista[];
}
