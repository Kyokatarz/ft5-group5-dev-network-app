import mutation from './mutation.graphql'
import type from './type.graphql'
import query from './query.graphql'
import { mergeTypeDefs } from '@graphql-tools/merge'

const typesArray = [query, mutation, type]

export default mergeTypeDefs(typesArray)
