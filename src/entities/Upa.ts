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
import { Umf } from "./Umf";
import { Ut } from "./Ut";

// @Index("upa_pkey", ["idUpa"], { unique: true })
@Entity("upa", { schema: "public" })
export class Upa extends BaseModel{
  // @PrimaryGeneratedColumn({ type: "bigint", name: "id_upa" })
  // idUpa: string;

  @Column("integer", { name: "ano" })
  ano: number;

  @Column({
    name: "descricao",
    nullable: true,
    length: 50,
  })
  descricao: string;

  @Column({
    name: "equacao_volume_arvore",
    nullable: true,
    length: 1000,
  })
  equacaoVolumeArvore: string;

  @Column({
    name: "equacao_abasal_arvore",
    nullable: true,
    length: 1000,
  })
  equacaoAbasalArvore: string;

  @Column({ name: "tipo", nullable: true })
  tipo: number;

  @Column({
    name: "sys_ref_coord",
    nullable: true,
    length: 100,
  })
  sysRefCoord: string;

  @Column({ name: "epsg", nullable: true })
  epsg: number;

  @ManyToOne(() => Umf, (umf) => umf.upas, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_umf", referencedColumnName: "id" }])
  umf: Umf;

  @OneToMany(() => Ut, (ut) => ut.upa)
  uts: Ut[];
}
