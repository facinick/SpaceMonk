import type { FindPostQuery, FindPostQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Route } from '@redwoodjs/router'
import { back } from '@redwoodjs/router'
import { truncate } from 'src/utils/string'
import PostCardBig from '../PostCardBig/PostCardBig'

export const QUERY = gql`
  query FindPostQuery($id: Int!) {
    post: post(id: $id) {
      id
      title
      body
      headerImageUrl
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindPostQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  post,
}: CellSuccessProps<FindPostQuery, FindPostQueryVariables>) => {
  return (


    <PostCardBig createdAt={post.createdAt} body={post.body} title={post.title} headerImageUrl={post.headerImageUrl || `https://loremflickr.com/1920/720`} id={post.id} />


  )
}
