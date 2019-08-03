import { buildSchema } from 'graphql'

export const schema = buildSchema(`
    type Client {
        id: ID
        name: String!
        lastname: String!
        company: String
        email: String
    }

    type Query {
        getClient(id: ID!): Client
        getClients: [Client]
    }

    input ClientInput {
        name: String!
        lastname: String!
        company: String
        email: String
    }

    type Mutation {
        createClient(input: ClientInput!) : Client
    }
`)
