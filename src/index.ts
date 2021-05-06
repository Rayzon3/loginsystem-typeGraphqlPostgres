import { ApolloServer } from "apollo-server-express"
import Express from "express"
import "reflect-metadata"
import { buildSchema } from 'type-graphql'
import { registerResolver } from "./modules/user/Register"
import { createConnection } from "typeorm"
import session from "express-session"
import connectRedis from "connect-redis"
import { redis } from "./redis"
import cors from "cors"
import { loginResolver } from "./modules/user/Login"
import { findUserResolver } from "./modules/user/FindUser"

const main = async () => {

    //connecting to DB
    await createConnection(); 

    const schema = await buildSchema({
        resolvers: [registerResolver, loginResolver, findUserResolver]
    })

    const server = new ApolloServer({ 
        schema, 
        context: ({ req }: any) => ({ req }) }) //request context we can access it in our resolver  

    //instance of express
    const app = Express()

    //session middleware always needs to be before applyMiddleware
    const RedisStore = connectRedis(session)
    app.use(cors({
        credentials: true,
        origin: "http://localhost:3000" // port for frontend
    }))
    app.use(
        session({
            store: new RedisStore({
                client: redis as any,
            }),
            name: "qid", // name of cookie
            secret: "asdfgh123",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // age of cookie -> 7 years
            }
        }as any)
    )



    server.applyMiddleware({ app })
    app.listen(5000, () => {
        console.log("Sever running at  http://localhost:5000")
    })
}

main()