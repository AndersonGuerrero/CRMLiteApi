import { resolvers } from './resolvers'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = importSchema('data/schema.graphql')

export const schema = makeExecutableSchema({ typeDefs, resolvers })
