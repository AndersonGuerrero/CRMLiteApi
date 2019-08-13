import { Products } from '../db'

// Resolver
export const productsResolver = {
  Query: {
    getProduct: (root, { _id }) => {
      return new Promise((resolve, reject) => {
        Products.findById(_id, (error, product) => {
          if (error) reject(error)
          else resolve(product)
        })
      })
    },
    getProducts: (root, { limit, offset, search }) => {
      return new Promise((resolve, reject) => {
        let objectfind = {}
        if (search) objectfind = {$text: {$search: search}}
        Products.find(objectfind, null, { limit, skip: offset }, (error, products) => {
          if (error) reject(error)
          else resolve(products)
        })
      })
    },
    getTotalProducts: (root) => {
      return new Promise((resolve, reject) => {
        Products.estimatedDocumentCount((error, count) => {
          if (error) reject(error)
          else resolve(count)
        })
      })
    }
  },
  Mutation: {
    createProduct: (root, { input }) => {
      const newProduct = new Products({
        name: input.name,
        price: input.price,
        stock: input.stock
      })
      return new Promise((resolve, reject) => {
        newProduct.save((error) => {
          if (error) reject(error)
          else resolve(newProduct)
        })
      })
    },
    updateProduct: (root, { input }) => {
      return new Promise((resolve, reject) => {
        Products.updateOne({ _id: input._id }, input, { upsert: true }, (error) => {
          if (error) reject(error)
          else resolve(input)
        })
      })
    },
    removeProduct: (root, { _id }) => {
      return new Promise((resolve, reject) => {
        Products.deleteOne({ _id: _id }, (error) => {
          if (error) reject(error)
          else resolve(`Product ${_id} is delete!`)
        })
      })
    }
  }
}
