export const schema = gql`
  type ContactAdmin {
    id: Int!
    name: String!
    message: String!
  }

  type Query {
    contactAdmins: [ContactAdmin!]! @requireAuth(roles: ["admin"])
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
