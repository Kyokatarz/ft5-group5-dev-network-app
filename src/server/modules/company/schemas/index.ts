import input from './input.graphql'
import type from './type.graphql'
import query from './query.graphql'
import mutation from './mutation.graphql'
import { mergeTypeDefs } from '@graphql-tools/merge'

const typesArray = [input, query, mutation, type]

export default mergeTypeDefs(typesArray)
