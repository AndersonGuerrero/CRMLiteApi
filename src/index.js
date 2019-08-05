import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './schema.graphql'
import { resolvers } from './resolvers'

const port = process.env.PORT || 3000

console.log(process.env.NODE_ENV)

const app = express()

const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })

app.listen({ port: port }, () => {
  console.log(`server running ${server.graphqlPath} the port ${port}`)
})
