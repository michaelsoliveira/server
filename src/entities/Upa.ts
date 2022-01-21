import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Umf } from "./Umf";
import { Ut } from "./Ut";

@Index("upa_pkey", ["idUpa"], { unique: true })
@Entity("upa", { schema: "public" })
export class Upa {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_upa" })
  idUpa: string;

  @Column("integer", { name: "ano" })
  ano: number;

  @Column("character varying", {
    name: "descricao",
    nullable: true,
    length: 50,
  })
  descricao: string | null;

  @Column("character varying", {
    name: "equacao_volume_arvore",
    nullable: true,
    length: 1000,
  })
  equacaoVolumeArvore: string | null;

  @Column("character varying", {
    name: "equacao_abasal_arvore",
    nullable: true,
    length: 1000,
  })
  equacaoAbasalArvore: string | null;

  @Column("smallint", { name: "tipo", nullable: true })
  tipo: number | null;

  @Column("character varying", {
    name: "sys_ref_coord",
    nullable: true,
    length: 100,
  })
  sysRefCoord: string | null;

  @Column("integer", { name: "epsg", nullable: true })
  epsg: number | null;

  @ManyToOne(() => Umf, (umf) => umf.upas, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_umf", referencedColumnName: "idUmf" }])
  idUmf: Umf;

  @OneToMany(() => Ut, (ut) => ut.idUpa)
  uts: Ut[];
}
