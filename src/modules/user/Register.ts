import { Mutation, Query, Resolver, Arg, FieldResolver, Root } from "type-graphql"
import * as bcrypt from 'bcryptjs' 
import { User } from "../../entity/User"


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
        @Arg('firstName') firstName: string,
        @Arg('lastName') lastName: string,
        @Arg('email') email: string,
        @Arg('password') password: string
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