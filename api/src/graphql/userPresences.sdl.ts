export const schema = gql`
  type UserPresence {
    id: Int!
    lastSeen: DateTime!
    userId: Int!
    user: User!
  }

  type UserPresenceResponse {
    id: Int!
    lastSeen: DateTime!
    userId: Int!
    user: User!
  }

  input UserPresenceQueryInput {
    orderBy: OrderBy!
  }

  type Query {
    userPresences(query: PaginationInput): [UserPresenceResponse!]! @requireAuth
    userPresenceByUserId(userId: Int!): UserPresenceResponse @requireAuth
  }

  type UpdatePresenceResponse {
    id: Int!
    lastSeen: DateTime!
  }

  type Mutation {
    updateUserPresence: UpdatePresenceResponse! @requireAuth
  }
`
