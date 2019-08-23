import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)

const {
  DB_USER,
  DB_PASSWD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env

let connectString
if (!DB_PORT) connectString = `://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}`
else connectString = `://${DB_USER}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

mongoose.connect(`mongodb${connectString}`, { useNewUrlParser: true }, (error, db) => {
  if (error) mongoose.connect(`mongodb+srv${connectString}`, { useNewUrlParser: true })
  else console.log('Connected to Server MongoDB successfully!')
})

// Definir el schema de clientes
const clientSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  emails: Array,
  company: String,
  age: Number,
  type: String,
  orders: Array,
  seller: mongoose.Types.ObjectId
})

const productSchema = new mongoose.Schema({
  name: { type: String, index: true },
  price: Number,
  stock: Number
})

const orderSchema = new mongoose.Schema({
  order: Array,
  total: Number,
  date: Date,
  client: mongoose.Types.ObjectId,
  seller: mongoose.Types.ObjectId,
  state: String
})

// Modelo de usuarios
const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  username: String,
  password: String,
  role: String
})

// Hash password
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

const Clients = mongoose.model('clients', clientSchema)
const Products = mongoose.model('products', productSchema)
const Orders = mongoose.model('orders', orderSchema)
const Users = mongoose.model('users', userSchema)

export { Clients, Products, Orders, Users }
