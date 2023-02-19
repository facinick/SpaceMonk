export const UPVOTE_MUTATION = gql`
  mutation upvote($input: VotingInput) {
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
  mutation downvote($input: VotingInput) {
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

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      body
      createdAt
      score
      updatedAt
      author {
        id
        username
      }
      votes {
        id
        value
        user {
          id
          username
        }
      }
    }
  }
`

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      id
      body
      createdAt
      score
      updatedAt
      author {
        id
        username
      }
      votes {
        id
        value
        user {
          id
          username
        }
      }
    }
  }
`

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($id: Int!) {
    deletePost(id: $id) {
      id
      body
      createdAt
      score
      updatedAt
      author {
        id
        username
      }
      votes {
        id
        value
        user {
          id
          username
        }
      }
    }
  }
`
