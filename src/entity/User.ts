import { Field, ID, ObjectType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID) //@Field -> allowed to query (expose)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    firstName: string

    @Field()
    @Column()
    lastName: string

    @Field()
    @Column("text", { unique:true })
    email: string

    //only graphQL schema not in DB
    @Field()
    name: string

    @Column()
    password: string
}

