import express from 'express'
import graphqlHTTP from 'express-graphql'
import { schema } from './schema'

const app = express()

app.get('/', (req, res) => {
  res.send('Todo listo')
})

// Resolver
const resolver = {
  hola: () => 'Hola mundo desde graphql'
}

app.use('/api', graphqlHTTP({
  // schema a utilizar
  schema,
  // el resolver se pasa como rootValue
  rootValue: resolver,
  // Utilizamos graphiql
  graphiql: true
}))

app.listen(8000, () => {
  console.log('Servidor funcionando puerto 8000')
})
