import { Clients } from '../db'

// Resolver
export const clientsResolver = {
  Query: {
    getClient: (root, { _id }) => {
      return new Promise((resolve, reject) => {
        Clients.findById(_id, (error, client) => {
          if (error) reject(error)
          else resolve(client)
        })
      })
    },
    getClients: (root, { limit, offset }) => {
      return new Promise((resolve, reject) => {
        Clients.find({}, null, { limit, skip: offset }, (error, clients) => {
          if (error) reject(error)
          else resolve(clients)
        })
      })
    },
    getTotalClients: (root) => {
      return new Promise((resolve, reject) => {
        Clients.estimatedDocumentCount((error, count) => {
          if (error) reject(error)
          else resolve(count)
        })
      })
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
        seller: input.seller
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
    }
  }
}
