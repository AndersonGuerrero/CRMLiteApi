import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const {
  DB_USER,
  DB_PASSWD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env

const connectString = `://${DB_USER}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

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
  orders: Array
})

const Clients = mongoose.model('clients', clientSchema)

export { Clients }
