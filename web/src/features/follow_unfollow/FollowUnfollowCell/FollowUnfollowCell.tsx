import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { MY_FOLLOWING_QUERY } from 'src/graphql/queries'
import { CellEmpty } from 'src/features/redwood/CellWrapper/Empty'
import { CellLoading } from 'src/features/redwood/CellWrapper/Loading'
import { CellError } from 'src/features/redwood/CellWrapper/Error'
import {
  MY_FOLLOWINGVariables,
  MY_FOLLOWING,
  USER_PROFLIE_BY_USERNAME,
} from 'types/graphql'
import { FollowUnfollowButton } from '../FollowUnfollowButton/FollowUnfollowButton'

export const QUERY = MY_FOLLOWING_QUERY

export const Loading = () => <CellLoading></CellLoading>

export const isEmpty = () => false

export const Empty = (props) => <CellEmpty itemName="follow"></CellEmpty>

export const Failure = ({ error }: CellFailureProps<MY_FOLLOWINGVariables>) => (
  <CellError message={error.message}></CellError>
)

export const Success = ({
  followingByUsername,
  userProfile,
}: CellSuccessProps<MY_FOLLOWING, MY_FOLLOWINGVariables> & {
  userProfile: USER_PROFLIE_BY_USERNAME['userProfileByUsername']
}) => {
  return (
    <FollowUnfollowButton
      userProfile={userProfile}
      followingByUsername={followingByUsername}
    />
  )
}
