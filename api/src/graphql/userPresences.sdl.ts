export const schema = gql`
  type UserPresence {
    id: Int!
    lastSeen: DateTime!
    userId: Int!
    user: User!
  }

  enum UserPresencesSortOrder {
    asc
    desc
  }

  input UserPresenceOrderByInput {
    lastSeen: UserPresencesSortOrder
  }

  input UserPresencesConnectionArgs {
    first: Int
    after: String
    orderBy: UserPresenceOrderByInput
    filter: String
  }
  
  type UserPresencesEdge {
    cursor: String!
    node: UserPresence!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }
  
  type UserPresencesConnection {
    edges: [UserPresencesEdge]!
    pageInfo: PageInfo!
  }

  type Query {
    userPresences(query: UserPresencesConnectionArgs): UserPresencesConnection! @requireAuth
    userPresenceByUserId(userId: Int!): UserPresence @requireAuth
  }

  type UpdatePresenceResponse {
    id: Int!
    lastSeen: DateTime!
  }

  type Mutation {
    updateUserPresence: UserPresence! @requireAuth
  }
`
