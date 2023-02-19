import type {
  COMMENTS_BY_POST_ID,
  COMMENTS_BY_POST_IDVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { COMMENTS_BY_POST_ID_QUERY } from 'src/graphql/queries'
import PostCardBigCommentSection from '../PostCardBigCommentSection/PostCardBigCommentSection'
import { CellLoading } from '../CellWrapper/Loading'
import { CellEmpty } from '../CellWrapper/Empty'
import { CellError } from '../CellWrapper/Error'

export const QUERY = COMMENTS_BY_POST_ID_QUERY

export const Loading = () => <CellLoading />

export const Empty = () => <CellEmpty itemName="comments" />

export const Failure = ({
  error,
}: CellFailureProps<COMMENTS_BY_POST_IDVariables>) => (
  <CellError message={error.message} />
)

export const Success = ({
  commentsByPostId,
  input,
}: CellSuccessProps<COMMENTS_BY_POST_ID, COMMENTS_BY_POST_IDVariables> & {
  input: {
    postId: number
  }
}) => {
  return (
    <PostCardBigCommentSection
      postId={input.postId}
      comments={commentsByPostId}
    />
  )
}
