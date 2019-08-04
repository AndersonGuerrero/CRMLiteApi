import express from 'express'
import 'dotenv/config'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'

const port = process.env.PORT || 3000
// const isDev = process.env.NODE_ENV !== 'production'

const app = express()
const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })

app.listen({ port: port }, () => {
  console.log(`server running ${server.graphqlPath} the port ${port}`)
})
