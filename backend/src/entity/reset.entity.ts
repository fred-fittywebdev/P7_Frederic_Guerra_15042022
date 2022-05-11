import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Reset extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column({
        unique: true
    })
    forgot_token: string
}