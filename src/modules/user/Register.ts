import { Mutation, Query, Resolver, Arg, FieldResolver, Root } from "type-graphql"
import bcrypt from 'bcryptjs' 
import { User } from "../../entity/User"
import { RegisterInput } from "./register/Registerinput"


@Resolver(User)
export class registerResolver{
    @Query(() => String)
    async hello(){
        return "Hello World!"
    }

    @FieldResolver()
    async name(@Root() parent: User){
        return `${parent.firstName} ${parent.lastName}`
    } 

    @Mutation(() => User)
    async register(
        @Arg('data') {firstName, lastName, email, password}: RegisterInput,
    ) : Promise <User> {
        const hashedpswd = await bcrypt.hash(password, 12)

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedpswd
        }).save()

        return user
    }

}