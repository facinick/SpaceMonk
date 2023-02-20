export const schema = gql`
  type ContactAdmin {
    id: Int!
    name: String!
    message: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User
    userId: Int
  }

  type Query {
    contactAdmins: [ContactAdmin!]! @requireAuth(roles: ["admin"])
  }

  type Subscription {
    contactAdminCreated: ContactAdmin!
  }

  input CreateContactAdminInput {
    name: String!
    message: String!
  }

  input UpdateContactAdminInput {
    name: String
    message: String
  }

  type Mutation {
    createContactAdmin(input: CreateContactAdminInput!): ContactAdmin! @skipAuth
    deleteContactAdmin(id: Int!): ContactAdmin! @requireAuth(roles: ["admin"])
  }
`
