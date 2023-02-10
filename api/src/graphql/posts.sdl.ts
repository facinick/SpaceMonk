export const schema = gql`
  type Post {
    id: Int!
    title: String!
    body: String!
    headerImageUrl: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    posts: [Post!]! @skipAuth
    post(id: Int!): Post @skipAuth
  }

  input CreatePostInput {
    title: String!
    body: String!
    headerImageUrl: String
  }

  input UpdatePostInput {
    title: String
    body: String
    headerImageUrl: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @skipAuth
    updatePost(id: Int!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: Int!): Post! @requireAuth
  }
`
