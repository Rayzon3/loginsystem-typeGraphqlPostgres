import { ApolloServer } from "apollo-server-express"
import * as Express from "express"
import "reflect-metadata"
import { buildSchema, Resolver, Query } from 'type-graphql'


@Resolver()
class HelloResolver{
    @Query(() => String)
    async hello(){
        return "Hello World!"
    }
}


const main = async () => {
    const schema = await buildSchema({
        resolvers: [HelloResolver]
    })

    const server = new ApolloServer({schema})

    //instance of express
    const app = Express()

    server.applyMiddleware({ app })
    app.listen(5000, () => {
        console.log("Sever running at  http://localhost:5000")
    })
}

main()