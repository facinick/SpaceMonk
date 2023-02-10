export const schema = gql`
  type Contact {
    id: Int!
    name: String!
    phone: String!
    message: String
  }

  type Query {
    contacts: [Contact!]! @requireAuth(roles: "admin")
  }

  input CreateContactInput {
    name: String!
    phone: String!
    message: String
  }

  type Mutation {
    createContact(input: CreateContactInput!): Contact! @skipAuth
  }
`
