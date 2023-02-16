export const MY_VOTES_QUERY = gql`
  query UserVotesQuery($userId: Int!) {
    votes: votes(input: { userId: $userId }) {
      id
      snippetId
      commentId
      userId
      value
      entityType
    }
  }
`
