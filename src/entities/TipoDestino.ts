import { Column, Entity, Index, OneToMany } from "typeorm";
import { DestinoTora } from "./DestinoTora";

@Index("tipo_destino_pkey", ["idTipoDestino"], { unique: true })
@Index("uk_pmlndrl7c6nqhn9ojguho3sp9", ["nome"], { unique: true })
@Entity("tipo_destino", { schema: "public" })
export class TipoDestino {
  @Column("integer", { primary: true, name: "id_tipo_destino" })
  idTipoDestino: number;

  @Column("character varying", {
    name: "nome",
    nullable: true,
    unique: true,
    length: 50,
  })
  nome: string | null;

  @OneToMany(() => DestinoTora, (destinoTora) => destinoTora.idTipoDestino)
  destinoToras: DestinoTora[];
}
