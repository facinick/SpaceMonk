export const schema = gql`

  type Tag {
    id: Int!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    posts: [Post]!
  }

  enum TagsSortOrder {
    asc
    desc
  }

  input TagOrderByInput {
    name: TagsSortOrder
    popularity: TagsSortOrder
  }

  input TagsConnectionArgs {
    first: Int
    after: String
    orderBy: TagOrderByInput
    filter: String
  }

  type TagsEdge {
    cursor: String!
    node: Tag!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type TagsConnection {
    edges: [TagsEdge]!
    pageInfo: PageInfo!
  }

  type Query {
    tags(query: TagsConnectionArgs): TagsConnection! @skipAuth
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
