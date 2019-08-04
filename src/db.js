import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const {
  DB_USER,
  DB_PASSWD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env

mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true })

// Definir el schema de clientes
const clientSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  emails: Array,
  company: String,
  age: Number,
  type: String,
  orders: Array
})

const Clients = mongoose.model('clients', clientSchema)

export { Clients }
