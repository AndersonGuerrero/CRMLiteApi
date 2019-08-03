import express from 'express'
import graphqlHTTP from 'express-graphql'
import { schema } from './schema'

const app = express()

app.get('/', (req, res) => {
  res.send('api is working')
})

class Client {
  constructor (id, { name, lastname, email, company }) {
    this.id = id
    this.name = name
    this.lastname = lastname
    this.email = email
    this.company = company
  }
}

const clientsDB = []
// Resolver
const resolver = {
  getClient: ({ id }) => {
    const client = clientsDB.filter(client => client.id === id)
    console.log(client)
    if (client.length >= 1) {
      return client[0]
    }
    return null
  },
  getClients: () => {
    return clientsDB
  },
  createClient: ({ input }) => {
    const id = require('crypto').randomBytes(10).toString('hex')
    const client = new Client(id, input)
    clientsDB.push(client)
    return client
  }
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
  console.log('server running in the port 8000')
})
