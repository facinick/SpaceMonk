export const UPVOTE_MUTATION = gql`
  mutation upvoteMutation($input: VotingInput) {
    upvote(input: $input) {
      vote {
        id
        value
      }
      #for optimistic updates
      cudAction
      score
    }
  }
`

export const DOWNVOTE_MUTATION = gql`
  mutation downvoteMutation($input: VotingInput) {
    downvote(input: $input) {
      vote {
        id
        value
      }
      #for optimistic updates
      cudAction
      score
    }
  }
`
