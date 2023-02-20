export const MY_DATA_QUERY = gql`
  query MY_DATA {
    me {
      id
      userRoles {
        id
      }
      posts {
        id
      }
      votes {
        id
        entityType
      }
      comments {
        id
      }
    }
  }
`

export const ALL_POSTS_QUERY = gql`
  query ALL_POSTS($query: PaginationInput) {
    posts(query: $query) {
      posts {
        id
        title
        body
        headerImageUrl
        bodyPlainText
        createdAt
        updatedAt
        author {
          id
        }
        comments {
          id
        }
        votes {
          id
          entityType
        }
      }
    }
  }
`

export const POST_BY_ID_QUERY = gql`
  # your params will crom from here
  query POST_BY_ID($id: Int!) {
    # actual query is below, ex: post(id: 4)
    post(id: $id) {
      id
      title
      body
      headerImageUrl
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

export const COMMENTS_BY_POST_ID_QUERY = gql`
  query COMMENTS_BY_POST_ID($input: CommentsByPostIdInput!) {
    commentsByPostId(input: $input) {
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

export const CONTACT_ADMINS_QUERY = gql`
  query CONTACT_ADMINS {
    contactAdmins {
      id
      name
      message
      createdAt
      user {
        id
        username
      }
    }
  }
`
