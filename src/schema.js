import { importSchema } from 'graphql-import'
import path from 'path'

export const typeDefs = importSchema(path.join(__dirname, '/schema.graphql'))
