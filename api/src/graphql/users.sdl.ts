export const schema = gql`
  type User {
    id: Int!
    username: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    userRoles: [UserRole]!
    posts: [Post]!
    votes: [Vote]!
    comments: [Comment]!
    profile: UserProfile
    UserPresence: UserPresence
    followers: [Follows]!
    following: [Follows]!
  }

  enum UsersSortOrder {
    asc
    desc
  }

  input UserOrderByInput {
    username: UsersSortOrder
  }

  input UsersConnectionArgs {
    first: Int
    after: String
    orderBy: UserOrderByInput
    filter: String
  }
  
  type UsersEdge {
    cursor: String!
    node: User!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }
  
  type UsersConnection {
    edges: [UsersEdge]!
    pageInfo: PageInfo!
  }

  type Query {
    users(query: UsersConnectionArgs): UsersConnection! @skipAuth
    user(id: Int!): User @skipAuth
    me: User @requireAuth
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
    deleteUser(id: Int!): User! @requireAuth(roles: ["admin"])
  }
`
