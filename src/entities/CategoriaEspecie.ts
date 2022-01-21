import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Poa } from "./Poa";
import { Especie } from "./Especie";

@Index("categoria_especie_pkey", ["idCategoria"], { unique: true })
@Entity("categoria_especie", { schema: "public" })
export class CategoriaEspecie {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_categoria" })
  idCategoria: string;

  @Column("character varying", { name: "nome", nullable: true, length: 50 })
  nome: string | null;

  @Column("smallint", { name: "criterio_fuste", nullable: true })
  criterioFuste: number | null;

  @Column("smallint", { name: "criterio_dminc", nullable: true })
  criterioDminc: number | null;

  @Column("smallint", { name: "criterio_dmaxc", nullable: true })
  criterioDmaxc: number | null;

  @Column("smallint", { name: "criterio_n_min", nullable: true })
  criterioNMin: number | null;

  @Column("smallint", { name: "criterio_perc_min", nullable: true })
  criterioPercMin: number | null;

  @Column("boolean", { name: "preservar", nullable: true })
  preservar: boolean | null;

  @Column("integer", { name: "criterio_altura", nullable: true })
  criterioAltura: number | null;

  @Column("integer", { name: "criterio_volume", nullable: true })
  criterioVolume: number | null;

  @ManyToOne(() => Poa, (poa) => poa.categoriaEspecies)
  @JoinColumn([{ name: "id_poa", referencedColumnName: "idPoa" }])
  idPoa: Poa;

  @OneToMany(() => Especie, (especie) => especie.idCategoria)
  especies: Especie[];
}
