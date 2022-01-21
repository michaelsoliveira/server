import { Column, Entity } from "typeorm";

@Entity("versao", { schema: "public" })
export class Versao {
  @Column("character varying", { name: "numero", nullable: true, length: 5 })
  numero: string | null;
}
