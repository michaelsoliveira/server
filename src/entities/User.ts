import { Column, Entity, Exclusion, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { BaseModel } from "./BaseEntity";
import { Empresa } from "./Empresa";
import { Permission } from "./Permission";
import { Poa } from "./Poa";
import { RefreshToken } from "./RefreshToken";
import { Role } from "./Role";

@Entity("users")
export class User extends BaseModel {

    @Column()
    username: string;

    @Column()
    email: string;

    @Column({select: false})
    password: string;

    @Column({ nullable: true })
    provider: string;

    @Column({ name: "id_provider", nullable: true })
    idProvider: string

    // @OneToMany(() => Poa, (poa) => poa.user)
    // poas: Poa[];

    @ManyToMany(() => Role)
    @JoinTable({
        name: "users_roles",
        joinColumns: [{ name: "user_id" }],
        inverseJoinColumns: [{ name: "role_id" }],
    })
    roles: Role[];

    @ManyToMany(() => Permission)
    @JoinTable({
        name: "users_permissions",
        joinColumns: [{ name: "user_id" }],
        inverseJoinColumns: [{ name: "permission_id" }],
    })
    permissions: Permission[];

    @OneToMany(() => Empresa, (empresa) => empresa.user)
    empresas: Empresa[]

    @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
    refreshTokens: RefreshToken[]

}