import { Clients } from './db'

// Resolver
export const resolvers = {
  Query: {
    getClient: (root, { _id }) => {
      return new Promise((resolve, reject) => {
        Clients.findById(_id, (error, client) => {
          if (error) reject(error)
          else resolve(client)
        })
      })
    },
    getClients: (root, { limit }) => {
      return Clients.find({}).limit(limit)
    }
  },
  Mutation: {
    createClient: (root, { input }) => {
      const newClient = new Clients({
        name: input.name,
        lastname: input.lastname,
        emails: input.emails,
        company: input.company,
        age: input.age,
        type: input.type,
        orders: input.orders
      })
      return new Promise((resolve, reject) => {
        newClient.save((error) => {
          if (error) reject(error)
          else resolve(newClient)
        })
      })
    },
    updateClient: (root, { input }) => {
      return new Promise((resolve, reject) => {
        Clients.updateOne({ _id: input._id }, input, { upsert: true }, (error) => {
          if (error) reject(error)
          else resolve(input)
        })
      })
    },
    removeClient: (root, { _id }) => {
      return new Promise((resolve, reject) => {
        Clients.deleteOne({ _id: _id }, (error) => {
          if (error) reject(error)
          else resolve(`Client ${_id} is delete!`)
        })
      })
    },
  }
}
