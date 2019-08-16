import { Users } from '../db'

// Resolver
export const usersResolver = {
  Query: {
    getUsers: (root, { limit, offset }) => {
      return new Promise((resolve, reject) => {
        Users.find({}, null, { limit, skip: offset }, (error, users) => {
          if (error) reject(error)
          else resolve(users)
        })
      })
    }
  },
  Mutation: {
    createUser: async (root, { input }) => {
      const { name, lastname, password, username } = input
      let response = { error: false, message: '' }
      const userExist = await Users.findOne({ username })
      if (userExist) {
        response = {
          error: true,
          message: 'El nombre de usuario ya existe.'
        }
      } else {
        const newUser = await new Users({
          name: name,
          lastname: lastname,
          username: username,
          password: password
        }).save()
        response = {
          error: false,
          message: 'Usuario registrado con Exito.'
        }
      }
      return response
    }
  }
}
