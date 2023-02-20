export const schema = gql`
  type UserProfile {
    id: Int!
    bio: String
    profilePictureUrl: String
    headerImageUrl: String
    name: String
    age: String
    city: String
    interests: String
    userId: Int!
    user: User!
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
    age: String
    city: String
    interests: String
    userId: Int!
  }

  input UpdateUserProfileInput {
    bio: String
    profilePictureUrl: String
    headerImageUrl: String
    name: String
    age: String
    city: String
    interests: String
    userId: Int
  }

  type Mutation {
    createUserProfile(input: CreateUserProfileInput!): UserProfile! @requireAuth
    updateUserProfile(id: Int!, input: UpdateUserProfileInput!): UserProfile!
      @requireAuth
    deleteUserProfile(id: Int!): UserProfile! @requireAuth
  }
`
