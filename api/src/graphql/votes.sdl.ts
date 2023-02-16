export const schema = gql`
# model Vote {
#   id         Int      @id @default(autoincrement())
#   value      Int
#   entityType String
#   createdAt  DateTime @default(now())
#   updatedAt  DateTime @updatedAt
#   userId     Int
#   // vote given to what, comment or post
#   postId     Int?
#   commentId  Int?
#   // prisma relations
#   user       User     @relation(fields: [userId], references: [id])
#   post       Post?    @relation(fields: [postId], references: [id])
#   comment    Comment? @relation(fields: [commentId], references: [id])
# }

  type Vote {
    id: Int!
    value: Int!
    entityType: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    #userId: Int!
    #postId: Int
    #commentId: Int
    user: User!
    post: Post
    comment: Comment
  }

  input VotesQueryInput {
    userId: Int
  }

  type Query {
    votes(input: VotesQueryInput): [Vote]! @requireAuth
    myVotes: [Vote]! @requireAuth
    vote(id: Int!): Vote @requireAuth
  }

  enum CUDAction {
    CREATED
    DELETED
    UPDATED
  }

  input VotingInput {
    postId: Int
    commentId: Int
    entityType: String!
  }

  union Entity = Comment | Post

  type VoteResponse {
    vote: Vote!
    cudAction: CUDAction!
    score: Int!
  }

  type Mutation {
    upvote(input: VotingInput): VoteResponse! @requireAuth
    downvote(input: VotingInput): VoteResponse! @requireAuth
  }
`
