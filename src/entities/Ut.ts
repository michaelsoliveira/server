import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Arvore } from "./Arvore";
import { CategoriaEspecieUt } from "./CategoriaEspecieUt";
import { Tora } from "./Tora";
import { Poa } from "./Poa";
import { Upa } from "./Upa";

@Index("ut_pkey", ["idUt"], { unique: true })
@Entity("ut", { schema: "public" })
export class Ut {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_ut" })
  idUt: string;

  @Column("integer", { name: "numero_ut" })
  numeroUt: number;

  @Column("double precision", {
    name: "area_util",
    nullable: true,
    precision: 53,
  })
  areaUtil: number | null;

  @Column("double precision", {
    name: "area_total",
    nullable: true,
    precision: 53,
  })
  areaTotal: number | null;

  @Column("integer", { name: "quantidade_faixas", nullable: true })
  quantidadeFaixas: number | null;

  @Column("integer", { name: "largura_faixas", nullable: true })
  larguraFaixas: number | null;

  @Column("integer", { name: "comprimento_faixas", nullable: true })
  comprimentoFaixas: number | null;

  @Column("double precision", {
    name: "azimute",
    nullable: true,
    precision: 53,
  })
  azimute: number | null;

  @Column("integer", { name: "quadrante", nullable: true })
  quadrante: number | null;

  @Column("double precision", {
    name: "latitude",
    nullable: true,
    precision: 53,
  })
  latitude: number | null;

  @Column("double precision", {
    name: "longitude",
    nullable: true,
    precision: 53,
  })
  longitude: number | null;

  @Column("bytea", { name: "shapefile", nullable: true })
  shapefile: Buffer | null;

  @Column("geometry", { name: "origem", nullable: true })
  origem: string | null;

  @OneToMany(() => Arvore, (arvore) => arvore.idUt2)
  arvores: Arvore[];

  @OneToMany(
    () => CategoriaEspecieUt,
    (categoriaEspecieUt) => categoriaEspecieUt.idUt
  )
  categoriaEspecieUts: CategoriaEspecieUt[];

  @OneToMany(() => Tora, (tora) => tora.idUt)
  toras: Tora[];

  @ManyToOne(() => Poa, (poa) => poa.uts)
  @JoinColumn([{ name: "id_poa", referencedColumnName: "idPoa" }])
  idPoa: Poa;

  @ManyToOne(() => Upa, (upa) => upa.uts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_upa", referencedColumnName: "idUpa" }])
  idUpa: Upa;
}
