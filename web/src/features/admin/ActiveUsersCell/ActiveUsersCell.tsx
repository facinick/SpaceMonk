import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { USER_PRESENCE_QUERY } from 'src/graphql/queries'
import { USER_PRESENCE } from 'types/graphql'
import ActiveUsersComponent from '../ActiveUsersComponent/ActiveUsersComponent'

export const QUERY = USER_PRESENCE_QUERY

export const beforeQuery = (props) => {
  return {
    variables: props,
    pollInterval: 3000,
  }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ userPresences }: CellSuccessProps<USER_PRESENCE>) => {
  return <ActiveUsersComponent activeUsers={userPresences} />
}
