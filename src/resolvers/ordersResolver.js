import { Orders } from '../db'

// Resolver
export const ordersResolver = {
  Query: {
    getOrder: (root, { _id }) => {
      return new Promise((resolve, reject) => {
        Orders.findById(_id, (error, order) => {
          if (error) reject(error)
          else resolve(order)
        })
      })
    },
    getOrders: (root, { limit, offset }) => {
      return new Promise((resolve, reject) => {
        Orders.find({}, null, { limit, skip: offset }, (error, orders) => {
          if (error) reject(error)
          else resolve(orders)
        })
      })
    },
    getTotalOrders: (root) => {
      return new Promise((resolve, reject) => {
        Orders.estimatedDocumentCount((error, count) => {
          if (error) reject(error)
          else resolve(count)
        })
      })
    }
  },
  Mutation: {
    createOrder: (root, { input }) => {
      const newOrder = new Orders({
        name: input.name,
        order: input.order,
        total: input.total,
        date: new Date(),
        client: input.client,
        state: 'PENDIENTE'
      })
      return new Promise((resolve, reject) => {
        newOrder.save((error) => {
          if (error) reject(error)
          else resolve(newOrder)
        })
      })
    },
    updateOrder: (root, { input }) => {
      return new Promise((resolve, reject) => {
        Orders.updateOne({ _id: input._id }, input, { upsert: true }, (error) => {
          if (error) reject(error)
          else resolve(input)
        })
      })
    },
    removeOrder: (root, { _id }) => {
      return new Promise((resolve, reject) => {
        Orders.deleteOne({ _id: _id }, (error) => {
          if (error) reject(error)
          else resolve(`Order ${_id} is delete!`)
        })
      })
    }
  }
}
