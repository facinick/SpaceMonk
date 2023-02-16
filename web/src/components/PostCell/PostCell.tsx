import type { POST_BY_ID, POST_BY_IDVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import PostCardBig from '../PostCardBig/PostCardBig'
import { POST_BY_ID_QUERY } from 'src/graphql/queries'

export const QUERY = POST_BY_ID_QUERY

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<POST_BY_IDVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  post,
}: CellSuccessProps<POST_BY_ID, POST_BY_IDVariables>) => {
  return (
    <PostCardBig post={post} />
  )
}
