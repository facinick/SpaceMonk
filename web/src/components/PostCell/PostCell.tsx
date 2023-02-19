import type { POST_BY_ID, POST_BY_IDVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import PostCardBig from '../PostCardBig/PostCardBig'
import { POST_BY_ID_QUERY } from 'src/graphql/queries'
import { CellEmptyInfo } from '../CellWrapper/Empty'
import { CellLoading } from '../CellWrapper/Loading'
import { CellError } from '../CellWrapper/Error'

export const QUERY = POST_BY_ID_QUERY

export const Loading = () => <CellLoading />

export const Empty = () => <CellEmptyInfo itemName="Post" />

export const Failure = ({ error }: CellFailureProps<POST_BY_IDVariables>) => (
  <CellError message={error.message} />
)

export const Success = ({
  post,
}: CellSuccessProps<POST_BY_ID, POST_BY_IDVariables>) => {
  return (
    <>
      <PostCardBig post={post} />
    </>
  )
}
