import { IsEmail, Length } from "class-validator"
import { Field, InputType } from "type-graphql"
import { emailAlreadyExist } from "./emailAlreadyExists"

@InputType()
export class RegisterInput{
    @Field()
    @Length(1, 20)
    firstName: string

    @Field()
    @Length(2, 20)
    lastName: string

    @Field()
    @IsEmail()
    @emailAlreadyExist({ message: "This email already exists." })
    email: string

    @Field()
    password: string
}