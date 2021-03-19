import mutation from './mutation.graphql'
import type from './type.graphql'
import query from './query.graphql'
import input from './input.graphql'

import { mergeTypeDefs } from '@graphql-tools/merge'

const typesArray = [query, mutation, type, input]

export default mergeTypeDefs(typesArray)
