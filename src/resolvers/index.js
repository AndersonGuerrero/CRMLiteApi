import GMR from 'graphql-merge-resolvers'
import { clientsResolver } from './clientsResolver'
import { productsResolver } from './productsResolver'

export const resolvers = GMR.merge([
  clientsResolver,
  productsResolver
])
