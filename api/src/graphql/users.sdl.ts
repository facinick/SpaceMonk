export const schema = gql`
  type User {
    id: Int!
    name: String
    username: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    userRoles: [UserRole]!
  }

  type Query {
    users: [User!]! @requireAuth(roles: "admin")
    user(id: Int!): User @requireAuth(roles: "admin")
  }

  input CreateUserInput {
    name: String
    username: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    name: String
    username: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth(roles: "admin")
    deleteUser(id: Int!): User! @requireAuth(roles: "admin")
  }
`
