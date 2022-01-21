import { Column, Entity } from "typeorm";

@Entity("status", { schema: "public" })
export class Status {
  @Column("smallint", { name: "id_status", nullable: true })
  idStatus: number | null;
}
