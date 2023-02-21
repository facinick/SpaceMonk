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

  type Query {
    userPresences: [UserPresenceResponse!]! @requireAuth
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
