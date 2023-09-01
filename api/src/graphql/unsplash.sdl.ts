export const schema = gql`
type Unsplash {
    id: String!
    imageUrl: String!
}

type Query {
    randomImage: Unsplash! @skipAuth
}
`