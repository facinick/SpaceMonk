export const schema = gql`
  #----------------------- Prisma Reference ---------------------#
  # id                  Int        @id @default(autoincrement()) #
  # username            String     @unique                       #
  # hashedPassword      String                                   #
  # salt                String                                   #
  # resetToken          String?
  # resetTokenExpiresAt DateTime?                                #
  # createdAt           DateTime   @default(now())               #
  # updatedAt           DateTime   @updatedAt                    #
  # userRoles           UserRole[]                               #
  # posts               Post[]     @relation("author")           #
  # votes               Vote[]                                   #
  # comments            Comment[]                                #
  #--------------------------------------------------------------#
  type User {
    id: Int!#-----------------------------------#public
    username: String!#--------------------------#public
    # hashedPassword: String!-------------------#not_available
    # salt: String!-----------------------------#not_available
    # resetToken: String------------------------#not_available
    # resetTokenExpiresAt: DateTime-------------#not_available
    createdAt: DateTime!#-----------------------#public
    updatedAt: DateTime!#-----------------------#public
    userRoles: [UserRole]!#---------------------#authenticate(user) + #authorize(owner)
    posts: [Post]!#-----------------------------#public
    votes: [Vote]!#-----------------------------#public
    comments: [Comment]!#-----------------------#public
  }

  type Query {
    users: [User!]! @skipAuth#------------------#public
    user(id: Int!): User @skipAuth#-------------#public
    me: User @skipAuth#-----------------------#authenticate(user) + #authorize(owner)
  }

  # min requirements to create a user
  input CreateUserInput {
    username: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    userRoles: [String]
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
    deleteUser(id: Int!): User! @requireAuth(roles: "admin")
  }
`
