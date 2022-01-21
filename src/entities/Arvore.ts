import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Especie } from "./Especie";
import { MotivoPreservacaoArvore } from "./MotivoPreservacaoArvore";
import { ObservacaoArvore } from "./ObservacaoArvore";
import { SituacaoArvore } from "./SituacaoArvore";
import { Ut } from "./Ut";
import { Tora } from "./Tora";

@Index("inventario_pkey", ["idArvore"], { unique: true })
@Index("arvore_ut_unique", ["idUt", "numeroArvore"], { unique: true })
@Entity("arvore", { schema: "public" })
export class Arvore {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_arvore" })
  idArvore: string;

  @Column("bigint", { name: "id_ut", nullable: true, unique: true })
  idUt: string | null;

  @Column("integer", { name: "numero_arvore", nullable: true, unique: true })
  numeroArvore: number | null;

  @Column("double precision", { name: "dap", nullable: true, precision: 53 })
  dap: number | null;

  @Column("double precision", { name: "altura", nullable: true, precision: 53 })
  altura: number | null;

  @Column("integer", { name: "fuste", nullable: true })
  fuste: number | null;

  @Column("double precision", {
    name: "area_basal",
    nullable: true,
    precision: 53,
  })
  areaBasal: number | null;

  @Column("double precision", { name: "volume", nullable: true, precision: 53 })
  volume: number | null;

  @Column("character varying", {
    name: "comentario",
    nullable: true,
    length: 100,
  })
  comentario: string | null;

  @Column("character varying", { name: "orient_x", nullable: true, length: 1 })
  orientX: string | null;

  @Column("double precision", { name: "lat_x", nullable: true, precision: 53 })
  latX: number | null;

  @Column("double precision", { name: "long_y", nullable: true, precision: 53 })
  longY: number | null;

  @Column("integer", { name: "faixa", nullable: true })
  faixa: number | null;

  @Column("integer", { name: "gps", nullable: true })
  gps: number | null;

  @Column("boolean", { name: "derrubada", nullable: true })
  derrubada: boolean | null;

  @Column("character varying", {
    name: "motivo_nao_derruba",
    nullable: true,
    length: 120,
  })
  motivoNaoDerruba: string | null;

  @Column("smallint", { name: "secoes", nullable: true })
  secoes: number | null;

  @Column("bigint", { name: "id_substituida", nullable: true })
  idSubstituida: string | null;

  @Column("boolean", { name: "substituida", nullable: true })
  substituida: boolean | null;

  @Column("smallint", { name: "ponto", nullable: true })
  ponto: number | null;

  @Column("geometry", { name: "ponto_arvore", nullable: true })
  pontoArvore: string | null;

  @Column("point", { name: "arv_ponto", nullable: true })
  arvPonto: string | object | null;

  @Column("double precision", { name: "lat", nullable: true, precision: 53 })
  lat: number | null;

  @Column("double precision", { name: "lng", nullable: true, precision: 53 })
  lng: number | null;

  @ManyToOne(() => Especie, (especie) => especie.arvores, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_especie", referencedColumnName: "idEspecie" }])
  idEspecie: Especie;

  @ManyToOne(
    () => MotivoPreservacaoArvore,
    (motivoPreservacaoArvore) => motivoPreservacaoArvore.arvores
  )
  @JoinColumn([
    {
      name: "id_motivo_preservacao",
      referencedColumnName: "idMotivoPreservacao",
    },
  ])
  idMotivoPreservacao: MotivoPreservacaoArvore;

  @ManyToOne(
    () => ObservacaoArvore,
    (observacaoArvore) => observacaoArvore.arvores,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_observacao", referencedColumnName: "idObservacao" }])
  idObservacao: ObservacaoArvore;

  @ManyToOne(() => SituacaoArvore, (situacaoArvore) => situacaoArvore.arvores)
  @JoinColumn([{ name: "id_situacao", referencedColumnName: "idSituacao" }])
  idSituacao: SituacaoArvore;

  @ManyToOne(() => Ut, (ut) => ut.arvores, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_ut", referencedColumnName: "idUt" }])
  idUt2: Ut;

  @OneToMany(() => Tora, (tora) => tora.idArvore)
  toras: Tora[];
}
