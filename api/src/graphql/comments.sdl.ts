export const schema = gql`

# model Comment {
#  id              Int       @id @default(autoincrement())
#  createdAt       DateTime  @default(now())
#  updatedAt       DateTime  @updatedAt
#  body            String
#  authorId        Int
#  score           Int       @default(0)
#  postId          Int
#  activity        Int       @default(0)
#  votes           Vote[]
#  author          User      @relation(fields: [authorId], references: [id])
#  post            Post      @relation(fields: [postId], references: [id])
#  parentCommentId Int?
#  parent          Comment?  @relation("parentChildComment", fields: [parentCommentId], references: [id])
#  comments        Comment[] @relation("parentChildComment")
# }

  type Comment {
    id: Int! #public
    createdAt: DateTime! #public
    updatedAt: DateTime! #public
    body: String! #public
    #authorId: Int!#----------------------------------#not_available
    #postId: Int!#------------------------------------#not_available
    score: Int! #public
    #parentCommentId: Int#----------------------------#not_available
    votes: [Vote]! #public
    author: User! #public
    post: Post! #public
    parent: Comment! #public
    comments: [Comment]! #public
    activity: Int! #public
  }

  type Query {
    comments: [Comment]! @skipAuth
    comment(id: Int!): Comment @skipAuth
  }

  input CreateCommentInput {
    body: String!
    postId: Int!
    # optional
    parentCommentId: Int
  }

  input UpdateCommentInput {
    body: String
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @requireAuth
    updateComment(id: Int!, input: UpdateCommentInput!): Comment! @requireAuth
    deleteComment(id: Int!): Comment! @requireAuth
  }
`
