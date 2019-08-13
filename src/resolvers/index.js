import GMR from 'graphql-merge-resolvers'
import { clientsResolver } from './clientsResolver'
import { productsResolver } from './productsResolver'
import { ordersResolver } from './ordersResolver'

export const resolvers = GMR.merge([
  clientsResolver,
  productsResolver,
  ordersResolver
])
