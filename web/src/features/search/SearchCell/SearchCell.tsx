import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { SEARCH_QUERY } from 'src/graphql/queries'
import type { SEARCH, SEARCHVariables } from 'types/graphql'

export const QUERY = SEARCH_QUERY

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<SEARCHVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  tags,
  users,
  posts
}: CellSuccessProps<SEARCH, SEARCHVariables>) => {

  








  return (<div>{JSON.stringify(tags)}</div>)
}
