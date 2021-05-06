import { Mutation, Resolver, Arg, Ctx } from "type-graphql"
import bcrypt from 'bcryptjs' 
import { User } from "../../entity/User"
import { MyContext } from "../../types/MyContext"

@Resolver(User)
export class loginResolver{
    @Mutation(() => User, {nullable: true})
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() Ctx: MyContext
    ) : Promise <User | null> {
        //finding user
        const user = await User.findOne({ where: { email } })
        if(!user){
            return null
        }

        //checking password
        const valid = await bcrypt.compare(password, user.password)
        if(!valid){
            return null
        }

        Ctx.req.session!.userId = user.id

        return user
    }

}