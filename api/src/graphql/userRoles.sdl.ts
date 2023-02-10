export const schema = gql`
  type UserRole {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    user: User
    userId: Int
  }
`
