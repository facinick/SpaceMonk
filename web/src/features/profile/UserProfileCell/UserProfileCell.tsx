import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { CellEmpty } from 'src/features/redwood/CellWrapper/Empty'
import { CellError } from 'src/features/redwood/CellWrapper/Error'
import { CellLoading } from 'src/features/redwood/CellWrapper/Loading'
import { USER_PROFILE_BY_USERNAME_QUERY } from 'src/graphql/queries'
import { useAuthentication } from 'src/hooks/useAuthentication'
import {
  USER_PROFLIE_BY_USERNAME,
  USER_PROFLIE_BY_USERNAMEVariables,
} from 'types/graphql'
import UserProfileComponent from '../UserProfileComponent/UserProfileComponent'

export const QUERY = USER_PROFILE_BY_USERNAME_QUERY

export const Loading = () => <CellLoading></CellLoading>

export const Empty = (props) => {
  const userOrFalse = useAuthentication({})

  // user is logged in, profile is not created
  if (userOrFalse && userOrFalse.username === props.username) {
    return <div>This place could be yours, Create Profile?</div>
  } 
  
  // user is not logged in, profile is not created
  else {
    return <CellEmpty itemName="user profile"></CellEmpty>
  }
}

// user doesnt exist
export const Failure = ({
  error,
}: CellFailureProps<USER_PROFLIE_BY_USERNAMEVariables>) => (
  <CellError message={error.message}></CellError>
)

// user exists, may or may not be logged in les find out
export const Success = ({
  userProfileByUsername,
}: CellSuccessProps<
  USER_PROFLIE_BY_USERNAME,
  USER_PROFLIE_BY_USERNAMEVariables
>) => {
  return <UserProfileComponent userProfileByUsername={userProfileByUsername} />
}
