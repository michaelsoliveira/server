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
import { CategoriaEspeciePoa } from "./CategoriaEspeciePoa";
import { CategoriaEspecie } from "./CategoriaEspecie";

@Index("especie_pkey", ["idEspecie"], { unique: true })
@Entity("especie", { schema: "public" })
export class Especie {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_especie" })
  idEspecie: string;

  @Column("character varying", { name: "nome", nullable: true, length: 50 })
  nome: string | null;

  @Column("character varying", {
    name: "nome_orgao",
    nullable: true,
    length: 50,
  })
  nomeOrgao: string | null;

  @Column("character varying", {
    name: "nome_cientifico",
    nullable: true,
    length: 100,
  })
  nomeCientifico: string | null;

  @OneToMany(() => Arvore, (arvore) => arvore.idEspecie)
  arvores: Arvore[];

  @OneToMany(
    () => CategoriaEspeciePoa,
    (categoriaEspeciePoa) => categoriaEspeciePoa.idEspecie
  )
  categoriaEspeciePoas: CategoriaEspeciePoa[];

  @ManyToOne(
    () => CategoriaEspecie,
    (categoriaEspecie) => categoriaEspecie.especies
  )
  @JoinColumn([{ name: "id_categoria", referencedColumnName: "idCategoria" }])
  idCategoria: CategoriaEspecie;
}
