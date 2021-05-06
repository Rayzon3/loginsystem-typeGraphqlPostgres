import { Resolver, Mutation, Ctx } from "type-graphql"
import { MyContext } from "../../types/MyContext"

@Resolver()
export class logoutResolver{
    @Mutation(() => Boolean)
    async logout(
        @Ctx() Ctx: MyContext): Promise<Boolean>{
        return new Promise(
            (res, rej) => Ctx.req.session!.destroy((err) => {
            if(err){
                console.log(err)
                return rej(false)
            }

            Ctx.res.clearCookie("qid")
            return res(true)
        })
        )
    }
}