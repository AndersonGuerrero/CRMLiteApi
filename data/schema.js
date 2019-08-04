import { importSchema } from 'graphql-import'

export const typeDefs = importSchema('data/schema.graphql')
