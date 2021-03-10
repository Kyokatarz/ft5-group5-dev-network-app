import { Grid } from '@material-ui/core'
import React from 'react'

import { UserProfile } from '../../types'
import SearchResultCard from '../SearchResultCard'

type SearchResultContainerProps = {
  results: Partial<UserProfile>[]
}

const SearchResultContainer: React.FC<SearchResultContainerProps> = ({
  results,
}) => {
  return (
    <Grid container direction="column" spacing={1}>
      {results.map((result) => (
        <Grid item key={result.id}>
          <SearchResultCard
            id={result.id}
            firstName={result.firstName}
            lastName={result.lastName}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default SearchResultContainer
