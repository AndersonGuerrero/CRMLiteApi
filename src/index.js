import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './schema/schema.graphql'
import { resolvers } from './resolvers'
import jwt from 'jsonwebtoken'

const port = process.env.PORT || 3000

const app = express()

const server = new ApolloServer({
	typeDefs,
  resolvers,
  context: async({ req})=>{
    //Obtener token del cliente
    const token = req.headers['authorization']
    if ( token !== 'null'){
      try{
        const currentUser = await jwt.verify(token, process.env.SECRET_KEY)
        // Agregado user actual al request
        req.currentUser = currentUser
        return {
          currentUser
        }
      }catch(error){
        console.error('test')
        console.error(error)
      }
    }
  } 
})

server.applyMiddleware({ app })

app.listen({ port: port }, () => {
  console.log(`server running ${server.graphqlPath} the port ${port}`)
})
