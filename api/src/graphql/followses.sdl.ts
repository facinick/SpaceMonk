export const schema = gql`
  type Follows {
    id: Int!
    follower: User!
    followerId: Int!
    following: User!
    followingId: Int!
  }

  type Query {
    followers(userId: Int!): [Follows!]! @skipAuth
    following(userId: Int!): [Follows!]! @skipAuth
    followersByUsername(username: String!): [Follows!]! @skipAuth
    followingByUsername(username: String!): [Follows!]! @skipAuth
  }

  type Mutation {
    follow(userId: Int!): Follows! @requireAuth
    unfollow(userId: Int!): Follows! @requireAuth
  }
`
