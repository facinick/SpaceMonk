import type {
  USER_PROFLIE_BY_USERNAME,
  USER_PROFLIE_BY_USERNAMEVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { USER_PROFILE_BY_USERNAME_QUERY } from 'src/graphql/queries'
import { CellEmpty } from 'src/features/redwood/CellWrapper/Empty'
import { CellLoading } from 'src/features/redwood/CellWrapper/Loading'
import { CellError } from 'src/features/redwood/CellWrapper/Error'
import UserProfileComponent from '../UserProfileComponent/UserProfileComponent'
import { useAuthentication } from 'src/hooks/useAuthentication'

export const QUERY = USER_PROFILE_BY_USERNAME_QUERY

export const Loading = () => <CellLoading></CellLoading>

export const Empty = (props) => {
  const userOrFalse = useAuthentication({})

  if (userOrFalse && userOrFalse.username === props.username) {
    return <div>This place could be yours, Create Profile?</div>
  } else {
    return <CellEmpty itemName="user profile"></CellEmpty>
  }
}

export const Failure = ({
  error,
}: CellFailureProps<USER_PROFLIE_BY_USERNAMEVariables>) => (
  <CellError message={error.message}></CellError>
)

export const Success = ({
  userProfileByUsername,
}: CellSuccessProps<
  USER_PROFLIE_BY_USERNAME,
  USER_PROFLIE_BY_USERNAMEVariables
>) => {
  return <UserProfileComponent userProfileByUsername={userProfileByUsername} />
}
