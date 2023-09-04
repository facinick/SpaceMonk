export const schema = gql`

  type Tag {
    id: Int!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    posts: [Post]!
  }

  enum TagSort {
    asc
    desc
  }

  input TagOrderByInput {
    name: TagSort
    popularity: TagSort
  }

  input TagQueryFilterAndPagination {
    filter: String
    skip: Int
    take: Int
    orderBy: TagOrderByInput
  }

  type Query {
    tags(input: TagQueryFilterAndPagination): [Tag]! @skipAuth
    tag(id: Int!): Tag @skipAuth
    tagByName(name: String!): Tag @skipAuth
  }

  input CreateTagInput {
    name: String!
  }

  input UpdateTagInput {
    name: String
  }

  type Mutation {
    createTag(input: CreateTagInput!): Tag! @requireAuth
    deleteTag(id: Int!): Tag! @requireAuth
  }
`
