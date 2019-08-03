import { buildSchema } from 'graphql'

export const schema = buildSchema(`
    type query{
        hola: String
    }
`)
