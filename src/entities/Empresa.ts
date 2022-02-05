import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseModel } from "./BaseEntity";
import { Projeto } from "./Projeto";
import { Umf } from "./Umf";
import { User } from "./User";

@Entity("empresa")
export class Empresa extends BaseModel {
  // @PrimaryGeneratedColumn({ type: "bigint", name: "id_empresa" })
  // idEmpresa: string;

  @Column({ name: "razao_social", length: 50 })
  razaoSocial: string;

  @Column({
    name: "nome_fantasia",
    nullable: true,
    length: 40,
  })
  nomeFantasia: string;

  @Column({ name: "cnpj", nullable: true, length: 14 })
  cnpj: string;

  @Column({
    name: "reg_ambiental",
    nullable: true,
    length: 50,
  })
  regAmbiental: string;

  @Column({ name: "telefone", nullable: true, length: 10 })
  telefone: string;

  @Column({ name: "endereco", nullable: true, length: 60 })
  endereco: string;

  @Column({
    name: "complemento",
    nullable: true,
    length: 40,
  })
  complemento: string;

  @Column({ name: "cep", nullable: true, length: 8 })
  cep: string;

  @Column({
    name: "municipio",
    nullable: true,
    length: 30,
  })
  municipio: string;

  @Column({ name: "estado", nullable: true, length: 2 })
  estado: string;

  @Column({ name: "contato", nullable: true, length: 50 })
  contato: string;

  @Column({
    name: "resp_tecnico",
    nullable: true,
    length: 50,
  })
  respTecnico: string;

  @Column({
    name: "crea_resp",
    nullable: true,
    length: 50,
  })
  creaResp: string;

  @Column({ name: "dmin_relatorio", nullable: true })
  dminRelatorio: number;

  @Column({ name: "intervalo_dmin_relatorio", nullable: true })
  intervaloDminRelatorio: number;

  @OneToMany(() => Umf, (umf) => umf.empresa)
  umfs: Umf[];

  @ManyToOne(() => User, (user) => user.empresas)
  @JoinColumn([
    { name: "id_user", referencedColumnName: "id" }
  ])
  user: User

  @OneToMany(() => Projeto, (projeto) => projeto.empresa)
  projetos: Projeto[]
}
