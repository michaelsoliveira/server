import { Column, Entity, Exclusion, JoinTable, ManyToMany } from "typeorm";
import { BaseModel } from "./BaseEntity";
import { Permission } from "./Permission";
import { Role } from "./Role";

@Entity("users")
export class User extends BaseModel {

    @Column()
    username: string;

    @Column()
    email: string;

    @Column({select: false})
    password: string;

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

}