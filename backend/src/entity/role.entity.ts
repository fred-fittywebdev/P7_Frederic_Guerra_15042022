// import { Permission } from './permission.entity';
// import { Column, Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany, BaseEntity, } from "typeorm";

// @Entity()
// export class Role extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     name: string

//     @ManyToMany(() => Permission) // Un rolepeut avoir plusieurs permissions et une permission peut être attribuée a plusieurs roles
//     @JoinTable({
//         name: 'role_permission',
//         joinColumn: {name: 'role_id', referencedColumnName: 'id'} , // permet de connecter la table interméiduare a Role joincolumn est pour l'entitié actuelle celle ou on fait ce code
//         inverseJoinColumn: {name: 'permission_id', referencedColumnName: 'id'}  // Ici on failt le lien avec la table permissions inverseJoinColumn est pour l'autre entité

//     })
//     permissions: Permission[]
// }
