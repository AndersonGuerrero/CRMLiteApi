import GMR from 'graphql-merge-resolvers'
import { clientsResolver } from './clientsResolver'
import { productsResolver } from './productsResolver'
import { ordersResolver } from './ordersResolver'
import { usersResolver } from './usersResolver'

export const resolvers = GMR.merge([
  clientsResolver,
  productsResolver,
  ordersResolver,
  usersResolver
])
