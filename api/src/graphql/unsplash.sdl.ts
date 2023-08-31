export const schema = gql`
type Unsplash {
    id: String!
    imageUrl: String!
    width: Int!
    height: Int!
}

input UnsplashImageQueryInput {
    width: Int!
    height: Int!
}

type Query {
    randomImage(query: UnsplashImageQueryInput): Unsplash! @skipAuth
}
`