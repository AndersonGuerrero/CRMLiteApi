import { Users } from '../db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Resolver
const createToken = (user, secretKey, expiresIn) => {
  const { _id } = user
  return jwt.sign({ user:_id }, secretKey, { expiresIn }) 
}

export const usersResolver = {
  Query: {
    getAuthenticatedUser: (root, arg, { currentUser }) => {
      if(!currentUser){
        return null
      }
      // Opteniendo el usuario actual del request
      const user = Users.findOne({_id: currentUser.user})
      return user
    },
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
      const { name, lastname, password, username, role } = input
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
          password: password,
          role: role
        }).save()
        response = {
          error: false,
          message: 'Usuario registrado con Exito.'
        }
      }
      return response
    },
    authentication: async (root, { input }) => {
      const { password, username } = input
      let response = { error: false, message: '', token: '' }
      const userExist = await Users.findOne({ username })
      if ( !userExist ) {
        response = {
          error: true,
          message: 'El Usuario no Existe!'
        }
      } else { 
        const passwordCheck = await bcrypt.compare(password, userExist.password)
        if (passwordCheck) {
          const newToken = createToken(userExist, process.env.SECRET_KEY, '1hr')
          response = {
            error: false,
            message: 'Bienvenido!',
            token: newToken
          }
        }else{
          response = {
            error: true,
            message: 'Contaseña Incorrecta!'
          }
        }
      }
      return response
    }
  }
}
