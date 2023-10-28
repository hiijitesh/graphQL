import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
    const app = express();
    const PORT = 5000;

    app.use(express.json());
    app.get("/", (req, res) => {
        res.json({ message: "Server is up and running" });
    });

    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query{
            hello:String
             say(name:String):String
        }`, // Schema as string

        resolvers: {
            Query: {
                hello: () => {
                    `Hey there I am graphQL`;
                },
            },
        }, //actual function to be executed
    });

    await gqlServer.start();
    app.use("/graphql", expressMiddleware(gqlServer));

    app.listen(PORT, () => {
        console.log(`server is running on the PORT:${PORT}`);
    });
}

init();
