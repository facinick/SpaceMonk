export const UPVOTE_MUTATION = gql`
  mutation upvote($input: VotingInput) {
    upvote(input: $input) {
      vote {
        id
        value
        entityType
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
        entityType
      }
      #for optimistic updates
      cudAction
      score
    }
  }
`

export const CREATE_POST_MUTATION = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
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
        entityType
      }
    }
  }
`

export const UPDATE_POST_MUTATION = gql`
  mutation updatePost($id: Int!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
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
        entityType
      }
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
        entityType
      }
    }
  }
`

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      id
    }
  }
`

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($id: Int!) {
    deletePost(id: $id) {
      id
    }
  }
`
