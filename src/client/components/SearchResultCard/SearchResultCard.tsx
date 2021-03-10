import { Avatar, Card, CardActionArea, CardHeader } from '@material-ui/core'
import React from 'react'
import router, { useRouter } from 'next/router'

type SearchResultCardProps = {
  id: string
  firstName: string
  lastName: string
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  firstName,
  lastName,
  id,
}) => {
  const router = useRouter()

  const onResultClick = () => {
    router.push(`/profile/${id}`)
  }

  return (
    <Card>
      <CardActionArea onClick={onResultClick}>
        <CardHeader
          title={
            firstName && lastName
              ? firstName + ' ' + lastName
              : firstName
              ? firstName
              : lastName
              ? lastName
              : 'Unnamed User'
          }
          avatar={<Avatar />}
        />
      </CardActionArea>
    </Card>
  )
}

export default SearchResultCard
