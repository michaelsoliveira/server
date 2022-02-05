import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseModel } from "./BaseEntity";
import { Empresa } from "./Empresa";
import { Upa } from "./Upa";

// @Index("umf_pkey", ["idUmf"], { unique: true })
@Entity("umf")
export class Umf extends BaseModel {
  // @PrimaryGeneratedColumn({ type: "bigint", name: "id_umf" })
  // idUmf: string;

  @Column({ name: "nome", length: 50 })
  nome: string;

  @Column({
    name: "municipio",
    nullable: true,
    length: 30,
  })
  municipio: string;

  @Column({ name: "estado", nullable: true, length: 2 })
  estado: string;

  @Column({
    name: "localizacao",
    nullable: true,
    length: 50,
  })
  localizacao: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.umfs)
  @JoinColumn([{ name: "id_empresa", referencedColumnName: "id" }])
  empresa: Empresa;

  @OneToMany(() => Upa, (upa) => upa.umf)
  upas: Upa[];
}
