import express from 'express'
import 'dotenv/config'
import graphqlHTTP from 'express-graphql'
import { schema } from './data/schema'

const port = process.env.PORT || 3000
const isDev = process.env.NODE_ENV !== 'production'

const app = express()

app.get('/', (req, res) => {
  res.send('api is working')
})

app.use('/api', graphqlHTTP({
  // schema a utilizar
  schema,
  // Utilizamos graphiql
  graphiql: isDev
}))

app.listen(port, () => {
  console.log(`server running in the port ${port}`)
})
