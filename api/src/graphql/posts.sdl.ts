export const schema = gql`
  #----------------------- Prisma Reference ---------------------#
  # id             Int     @id @default(autoincrement())         #
  # title          String                                        #
  # body           String                                        #
  # headerImageUrl String?                                       #
  # score     Int       @default(0)                              #
  # authorId  Int                                                #
  # createdAt DateTime  @default(now())                          #
  # updatedAt DateTime  @updatedAt                               #
  # activity  Int       @default(0)                              #
  # author    User      @relation("author", fields: [authorId], references: [id])
  # comments  Comment[]                                          #
  # votes     Vote[]                                             #
  #--------------------------------------------------------------#

  input PaginationCursor {
    id: Int
  }

  type NextPaginationCursor {
    id: Int
  }

  input OrderBy {
    key: String
    order: String
  }

  input PaginationInput {
    skip: Int
    take: Int
    cursor: PaginationCursor
    #  createdAt activity score
    orderBy: OrderBy
    filter: String
  }
  type Post {
    id: Int! #-----------------------------------------#public
    title: String! #-----------------------------------#public
    body: String! #------------------------------------#public
    bodyPlainText: String! #---------------------------#public
    headerImageUrl: String #---------------------------#public
    #authorId: Int!#----------------------------------#not_available
    score: Int! #--------------------------------------#public
    createdAt: DateTime! #-----------------------------#public
    updatedAt: DateTime! #-----------------------------#public
    activity: Int! #-----------------------------------#public
    author: User! #------------------------------------#public
    comments: [Comment]! #-----------------------------#public
    votes: [Vote]! #-----------------------------------#public
  }

  type Query {
    # posts: [Post]! @skipAuth #-------------------------#public
    posts(query: PaginationInput): PaginationResponse! @skipAuth #-------------------------#public
    post(id: Int!): Post @skipAuth #-------------------#public
  }

  type PaginationResponse {
    posts: [Post]!
    cursor: NextPaginationCursor
    count: Int!
    end: Boolean!
  }

  input CreatePostInput {
    title: String!
    body: String!
    bodyPlainText: String!
    headerImageUrl: String #@optional_input
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
