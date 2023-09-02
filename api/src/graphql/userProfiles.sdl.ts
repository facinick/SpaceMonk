export const schema = gql`
  type UserProfile {
    id: Int!
    bio: String
    profilePictureUrl: String
    headerImageUrl: String
    name: String
    age: Int
    city: String
    interests: [String]!
    userId: Int!
    user: User!
    mask: Mask
  }

  enum Mask {
    SQUIRCLE
    HEART
    HEXASIDE
    HEXAVERT
    DECAGON
    PENTAGON
    DIAMOND
    SQUARE
    CIRCLE
    PARALITH
    PARALOGLIDE
    PARALLELOZEN
    PARALLELOSURF
    STARMI
    STARYU
    TRIADIX
    TRINEON
    TRIQUARK
    TRIFLUX
  }

  type Query {
    userProfiles: [UserProfile!]! @skipAuth
    userProfile(id: Int!): UserProfile @skipAuth
    userProfileByUsername(username: String!): UserProfile @skipAuth
  }

  input CreateUserProfileInput {
    bio: String
    profilePictureUrl: String
    headerImageUrl: String
    name: String
    age: Int
    city: String
    interests: [String]!
    userId: Int!
    mask: Mask
  }

  input UpdateUserProfileInput {
    bio: String
    profilePictureUrl: String
    headerImageUrl: String
    name: String
    age: Int
    city: String
    interests: [String]!
    userId: Int
    mask: Mask
  }

  type Mutation {
    createUserProfile(input: CreateUserProfileInput!): UserProfile! @requireAuth
    updateUserProfile(id: Int!, input: UpdateUserProfileInput!): UserProfile!
      @requireAuth
    deleteUserProfile(id: Int!): UserProfile! @requireAuth
  }
`
