import { GetServerSideProps } from 'next'
import request from 'graphql-request'

import {
  host,
  searchUsersByName,
} from '../../src/client/helpers/gql-string-factory'
import { UserProfile } from '../../src/client/types'
import SearchResultPage from '../../src/client/components/SearchResultPage'

const index = (props: { results: UserProfile[] }) => {
  return <SearchResultPage results={props.results} />
}

export default index

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { searchString } = ctx.query as { searchString: string }
  const resp = await request(host, searchUsersByName(searchString))

  return {
    props: {
      results: resp.searchUsersByName,
    },
  }
}
