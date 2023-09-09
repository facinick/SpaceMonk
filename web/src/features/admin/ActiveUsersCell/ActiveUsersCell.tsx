import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { CellEmpty } from 'src/features/redwood/CellWrapper/Empty'
import { CellError } from 'src/features/redwood/CellWrapper/Error'
import { CellLoading } from 'src/features/redwood/CellWrapper/Loading'
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

export const Loading = () => <CellLoading />

export const Empty = () => <CellEmpty itemName={'Users'} />

export const Failure = ({ error }: CellFailureProps) => <CellError message={error.message} />

export const Success = ({ userPresences }: CellSuccessProps<USER_PRESENCE>) => {
  return <ActiveUsersComponent activeUsers={userPresences} />
}
