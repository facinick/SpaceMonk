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
  query ALL_POSTS($query: PostsConnectionArgs) {
    posts(query: $query) {
      edges {
        node {
          id
          title
          body
          headerImageUrl
          bodyPlainText
          createdAt
          updatedAt
          author {
            id
            username
          }
          comments {
            id
          }
          votes {
            id
            entityType
          }
          tags {
            id
            name
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`

export const ALL_POSTS_BY_USERNAME_QUERY = gql`
  query ALL_POSTS_BY_USERNAME($username: String!, $query: PostsConnectionArgs,) {  
    postsByUsername(username: $username, query: $query) {  
      edges {
        node {
          id
          title
          body
          headerImageUrl
          bodyPlainText
          createdAt
          updatedAt
          author {
            id
            username
          }
          comments {
            id
          }
          votes {
            id
            entityType
          }
          tags {
            id
            name
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
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
      tags {
        id
        name
      }
    }
  }
`

export const COMMENTS_BY_POST_ID_QUERY = gql`
  query COMMENTS_BY_POST_ID($postId: Int!, $query: CommentsConnectionArgs) {
    commentsByPostId(postId: $postId, query: $query) {
     edges {
      node {
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
     pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
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

export const USER_PROFILE_BY_USERNAME_QUERY = gql`
  query USER_PROFLIE_BY_USERNAME($username: String!) {
    userProfileByUsername(username: $username) {
      id
      bio
      profilePictureUrl
      headerImageUrl
      name
      age
      city
      interests
      user {
        username
      }
    }
  }
`

export const MY_FOLLOWERS_QUERY = gql`
  query MY_FOLLOWERS($username: String!) {
    followersByUsername(username: $username) {
      id
      follower {
        id
        username
      }
      followerId
      following {
        id
        username
      }
      followingId
    }
  }
`

export const MY_FOLLOWING_QUERY = gql`
  query MY_FOLLOWING($username: String!) {
    followingByUsername(username: $username) {
      id
      follower {
        id
        username
      }
      followerId
      following {
        id
        username
      }
      followingId
    }
  }
`

export const USER_PRESENCE_QUERY = gql`
  query USER_PRESENCE($query: UserPresencesConnectionArgs) {
    userPresences(query: $query) {
      edges {
        node {
          id
          lastSeen
          userId
          user {
            username
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`

export const TAGS_QUERY = gql`
  query TAGS($query: TagsConnectionArgs) {
    tags(query: $query) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;

export const SEARCH_QUERY = gql`
  query SEARCH(query: { filter: String! }) {
    tags(query: { filter: $filter}) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
    
    users(query: { filter: $filter}) {
      edges {
        node {
          id
          username
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
    posts(query: { filter: $filter}) {
      edges {
        node {
          id
          title
          body
          headerImageUrl
          bodyPlainText
          createdAt
          updatedAt
          author {
            id
            username
          }
          comments {
            id
          }
          votes {
            id
            entityType
          }
          tags {
            id
            name
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;

export const TAG_QUERY = gql`
  query TAG($name: String!) {
    tagByName(name: $name) {
      id
      name
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
          username
        }
        comments {
          id
        }
        votes {
          id
          entityType
        }
        tags {
          id
          name
        }
      }
    }
  }
`;