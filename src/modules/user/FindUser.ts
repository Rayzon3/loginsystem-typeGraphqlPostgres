import { MyContext } from "src/types/MyContext"
import { Query, Resolver, Ctx } from "type-graphql"
import { User } from "../../entity/User"

@Resolver(User)
export class findUserResolver{
    @Query(() => User, {nullable: true})
    async findUser(@Ctx() Ctx: MyContext): Promise<User | undefined>{
        if(!Ctx.req.session!.userId){
            return undefined;
        }
        return User.findOne(Ctx.req.session!.userId)
    }
}