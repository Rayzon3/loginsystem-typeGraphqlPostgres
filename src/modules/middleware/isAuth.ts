import { MyContext } from "../../types/MyContext"
import { MiddlewareFn } from "type-graphql"

//function to check if user is authenticated
export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
    if(!context.req.session!.userId){
        throw new Error("User not authenticated!")
    }

    return next
}