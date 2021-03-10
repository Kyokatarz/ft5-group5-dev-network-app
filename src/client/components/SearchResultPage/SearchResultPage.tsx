import { makeStyles, Theme, createStyles, Container } from '@material-ui/core'
import React from 'react'

import { UserProfile } from '../../types'
import SearchResultContainer from '../SearchResultContainer'

type SearchResultPageProps = {
  results: Partial<UserProfile>[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(9),
    },
  })
)

const SearchResultPage: React.FC<SearchResultPageProps> = ({ results }) => {
  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <SearchResultContainer results={results} />
    </Container>
  )
}

export default SearchResultPage
