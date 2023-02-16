import type { COMMENTS_BY_POST_ID, COMMENTS_BY_POST_IDVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { COMMENTS_BY_POST_ID_QUERY } from 'src/graphql/queries'
import PostCardBigCommentSection from '../PostCardBigCommentSection/PostCardBigCommentSection'

export const QUERY = COMMENTS_BY_POST_ID_QUERY

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No Comments.. Such Empty!</div>

export const Failure = ({
  error,
}: CellFailureProps<COMMENTS_BY_POST_IDVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  commentsByPostId,
  postId
}: CellSuccessProps<COMMENTS_BY_POST_ID, COMMENTS_BY_POST_IDVariables> & { postId: number }) => {
  return <PostCardBigCommentSection postId={postId} comments={commentsByPostId} />
}
