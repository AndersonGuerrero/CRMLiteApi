import { Orders, Products } from '../db'

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
    getOrders: (root, { limit, offset, client }) => {
      return new Promise((resolve, reject) => {
        let filter = {}
        if (client) filter = { client: client }
        Orders.find(filter, null, { limit, skip: offset }, (error, orders) => {
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
    },
    getTopClients: (root) => {
      return new Promise((resolve, reject) => {
        Orders.aggregate([
          {
            $match : { state: 'COMPLETED' }
          },
          {
            $group: { _id: '$client', total: { $sum: '$total' } }
          },
          {
            $lookup: {
              from: 'clients',
              localField: '_id',
              foreignField: '_id',
              as: 'client'
            }
          },
          {
            $sort: { total: -1 }
          },
          {
            $limit: 10
          }
        ], (error, result) => {
          if (error) reject(`Error: ${error}`)
          else resolve(result)
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
        state: 'PENDING'
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
        const { state } = input
        let action = '+'
        if (state === 'COMPLETED') action = '-'
        else if (state === 'CANCELLED') action = '+'

        input.order.forEach(p => {
          Products.updateOne(
            { _id: p.product_id },
            { $inc: { stock: `${action}${p.quantity}` } },
            { upsert: true },
            (error, data) => { if (error) reject(error) }
          )
        })
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
