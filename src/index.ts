import { ApolloServer } from "apollo-server-express"
import * as Express from "express"
import "reflect-metadata"
import { buildSchema } from 'type-graphql'
import { registerResolver } from "./modules/user/Register"
import { createConnection } from "typeorm"



const main = async () => {

    //connecting to DB
    await createConnection(); 

    const schema = await buildSchema({
        resolvers: [registerResolver]
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