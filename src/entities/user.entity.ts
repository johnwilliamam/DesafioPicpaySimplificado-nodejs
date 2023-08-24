import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({unique: false, nullable: false, type:'varchar'})
    firstName: string;
    @Column({unique: false, nullable: false, type: 'varchar'})
    lastName: string;
    @Column({unique: true, nullable: false, type: 'varchar'})
    document: string;
    @Column({unique: true, nullable: false, type: 'varchar'})
    email: string;
    @Column({unique: false, nullable: true, type: 'varchar'})
    password: string;
    @Column({unique: false, nullable: false, type: 'varchar'})
    type: string;
    @Column({unique: false, nullable: true, type: 'float', default: 0})
    balance: number;
}