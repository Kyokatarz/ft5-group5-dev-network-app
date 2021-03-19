import { makeExecutableSchema } from 'graphql-tools'
import { importSchema } from 'graphql-import'
import path from 'path'

import resolvers from './resolvers'
import companyTypeDefs from './schemas'

export default makeExecutableSchema({ typeDefs: companyTypeDefs, resolvers })
