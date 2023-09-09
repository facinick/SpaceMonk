import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { COMMENTS_BY_POST_ID_QUERY } from 'src/graphql/queries'
import type {
  COMMENTS_BY_POST_ID,
  COMMENTS_BY_POST_IDVariables,
} from 'types/graphql'
import { CellEmpty } from '../../redwood/CellWrapper/Empty'
import { CellError } from '../../redwood/CellWrapper/Error'
import { CellLoading } from '../../redwood/CellWrapper/Loading'
import { CommentSection } from '../CommentSection/CommentSection'

export const QUERY = COMMENTS_BY_POST_ID_QUERY

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'cache-first',
  }
}

export const Loading = () => <CellLoading />

export const Empty = () => <CellEmpty itemName="comments" />

export const Failure = ({
  error,
}: CellFailureProps<COMMENTS_BY_POST_IDVariables>) => (
  <CellError message={error.message} />
)

export const Success = ({
  commentsByPostId,
  postId,
}: CellSuccessProps<COMMENTS_BY_POST_ID, COMMENTS_BY_POST_IDVariables> & {
  postId: number
}) => {

  const comments = commentsByPostId.edges.map((edge) => {
    return edge.node
  })

  return <CommentSection postId={postId} comments={comments} />
}
