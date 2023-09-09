export const schema = gql`

  type Post {
    id: Int! 
    title: String! 
    body: String! 
    bodyPlainText: String! 
    headerImageUrl: String 
    #authorId: Int!
    score: Int! 
    createdAt: DateTime! 
    updatedAt: DateTime! 
    activity: Int! 
    author: User! 
    comments: [Comment]! 
    votes: [Vote]! 
    tags: [Tag]!   
  }

  enum PostsSortOrder {
    asc
    desc
  }

  input PostOrderByInput {
    createdAt: PostsSortOrder
    activity: PostsSortOrder
    score: PostsSortOrder
  }

  input PostsConnectionArgs {
    first: Int
    after: String
    orderBy: PostOrderByInput
    filter: String
  }
  
  type PostsEdge {
    cursor: String!
    node: Post!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type PostsConnection {
    edges: [PostsEdge]!
    pageInfo: PageInfo!
  }

  type Query {
    posts(query: PostsConnectionArgs): PostsConnection! @skipAuth 
    postsByUsername(username: String!, query: PostsConnectionArgs): PostsConnection! @skipAuth 
    post(id: Int!): Post @skipAuth 
  }

  input ConnectOrCreateTagInput {
    id: Int
    name: String!
  }

  input CreatePostInput {
    title: String!
    body: String!
    bodyPlainText: String!
    headerImageUrl: String #@optional_input
    tags: [ConnectOrCreateTagInput]!
  }

  input UpdatePostInput {
    title: String
    body: String
    bodyPlainText: String
    headerImageUrl: String #@optional_input
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: Int!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: Int!): Post! @requireAuth
  }
`
