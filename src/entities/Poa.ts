import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CategoriaEspecie } from "./CategoriaEspecie";
import { CategoriaEspecieUt } from "./CategoriaEspecieUt";
import { SituacaoPoa } from "./SituacaoPoa";
import { Saida } from "./Saida";
import { Ut } from "./Ut";

@Index("poa_pkey", ["idPoa"], { unique: true })
@Entity("poa", { schema: "public" })
export class Poa {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_poa" })
  idPoa: string;

  @Column("character varying", {
    name: "descricao",
    nullable: true,
    length: 50,
  })
  descricao: string | null;

  @Column("character varying", {
    name: "data_ultimo_plan",
    nullable: true,
    length: 50,
  })
  dataUltimoPlan: string | null;

  @Column("character varying", { name: "pmfs", nullable: true, length: 50 })
  pmfs: string | null;

  @Column("character varying", {
    name: "nome_resp_elab",
    nullable: true,
    length: 50,
  })
  nomeRespElab: string | null;

  @Column("character varying", {
    name: "crea_resp_elab",
    nullable: true,
    length: 25,
  })
  creaRespElab: string | null;

  @Column("character varying", {
    name: "art_resp_elab",
    nullable: true,
    length: 25,
  })
  artRespElab: string | null;

  @Column("character varying", {
    name: "nome_resp_exec",
    nullable: true,
    length: 50,
  })
  nomeRespExec: string | null;

  @Column("character varying", {
    name: "crea_resp_exec",
    nullable: true,
    length: 25,
  })
  creaRespExec: string | null;

  @Column("character varying", {
    name: "art_resp_exec",
    nullable: true,
    length: 25,
  })
  artRespExec: string | null;

  @Column("character varying", {
    name: "nome_detentor",
    nullable: true,
    length: 50,
  })
  nomeDetentor: string | null;

  @Column("character varying", {
    name: "cpf_detentor",
    nullable: true,
    length: 11,
  })
  cpfDetentor: string | null;

  @Column("character varying", {
    name: "nome_proponente",
    nullable: true,
    length: 50,
  })
  nomeProponente: string | null;

  @Column("character varying", {
    name: "cpf_proponente",
    nullable: true,
    length: 11,
  })
  cpfProponente: string | null;

  @Column("bigint", { name: "id_usuario", nullable: true })
  idUsuario: string | null;

  @Column("double precision", {
    name: "corte_maximo",
    nullable: true,
    precision: 53,
  })
  corteMaximo: number | null;

  @Column("integer", { name: "id_parent", nullable: true })
  idParent: number | null;

  @OneToMany(
    () => CategoriaEspecie,
    (categoriaEspecie) => categoriaEspecie.idPoa
  )
  categoriaEspecies: CategoriaEspecie[];

  @OneToMany(
    () => CategoriaEspecieUt,
    (categoriaEspecieUt) => categoriaEspecieUt.idPoa
  )
  categoriaEspecieUts: CategoriaEspecieUt[];

  @ManyToOne(() => SituacaoPoa, (situacaoPoa) => situacaoPoa.poas)
  @JoinColumn([{ name: "id_situacao", referencedColumnName: "idSituacao" }])
  idSituacao: SituacaoPoa;

  @OneToMany(() => Saida, (saida) => saida.idPoa)
  saidas: Saida[];

  @OneToMany(() => Ut, (ut) => ut.idPoa)
  uts: Ut[];
}
