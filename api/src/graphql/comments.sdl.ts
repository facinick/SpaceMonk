export const schema = gql`
  type Comment {
    id: Int! 
    createdAt: DateTime! 
    updatedAt: DateTime! 
    body: String! 
    authorId: Int!
    postId: Int!
    score: Int! 
    parentCommentId: Int
    votes: [Vote]! 
    author: User! 
    post: Post! 
    parent: Comment 
    comments: [Comment]! 
    activity: Int! 
  }

  input CommentsByPostIdInput {
    postId: Int!
  }

  enum CommentsSortOrder {
    asc
    desc
  }

  input CommentOrderByInput {
    createdAt: CommentsSortOrder
  }

  input CommentsConnectionArgs {
    first: Int
    after: String
    orderBy: CommentOrderByInput
    filter: String
  }
  
  type CommentsEdge {
    cursor: String!
    node: Comment!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }
  
  type CommentsConnection {
    edges: [CommentsEdge]!
    pageInfo: PageInfo!
  }
  
  type Query {
    comments(query: CommentsConnectionArgs): CommentsConnection! @skipAuth
    comment(id: Int!): Comment @skipAuth
    commentsByPostId(postId: Int!, query: CommentsConnectionArgs): CommentsConnection! @skipAuth
  }

  input CreateCommentInput {
    body: String!
    postId: Int!
    parentCommentId: Int
  }

  input UpdateCommentInput {
    body: String
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @requireAuth
    deleteComment(id: Int!): Comment! @requireAuth
  }
`
