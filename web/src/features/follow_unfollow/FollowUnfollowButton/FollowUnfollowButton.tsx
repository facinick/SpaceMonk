import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { useMemo } from 'react'
import { FOLLOW_MUTATION, UNFOLLOW_MUTATION } from 'src/graphql/mutations'
import { MY_FOLLOWING_QUERY } from 'src/graphql/queries'
import {
  MY_FOLLOWING,
  USER_PROFLIE_BY_USERNAME,
  follow,
  unfollow,
} from 'types/graphql'

interface ComponentProps {
  followingByUsername: MY_FOLLOWING['followingByUsername']
  userProfile: USER_PROFLIE_BY_USERNAME['userProfileByUsername']
}

const FollowUnfollowButton = (props: ComponentProps) => {
  const { followingByUsername, userProfile } = props

  const loggedInUserIsFollowingThisProfileUser = useMemo(() => {
    return followingByUsername.some((follows) => {
      if (follows.following.username === userProfile.user.username) {
        return true
      }
    })
  }, [followingByUsername])

  const [follow, { loading: loading_follow }] = useMutation<follow>(
    FOLLOW_MUTATION,
    {
      onCompleted: (data) => {
        toast.success(`you are a submissive bitch aren't you`)
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [MY_FOLLOWING_QUERY],
    }
  )

  const [unfollow, { loading: loading_unfollow }] = useMutation<unfollow>(
    UNFOLLOW_MUTATION,
    {
      onCompleted: (data) => {
        toast.success('yikes, got rid of that')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [MY_FOLLOWING_QUERY],
    }
  )

  const showFollowButton = !loggedInUserIsFollowingThisProfileUser

  const showUnfollowButton = loggedInUserIsFollowingThisProfileUser

  const disableInput = loading_follow || loading_unfollow

  const onFollowClick = () => {
    follow({
      variables: {
        userId: userProfile.id,
      },
    })
  }

  const onUnFollowClick = () => {
    unfollow({
      variables: {
        userId: userProfile.id,
      },
    })
  }

  return (
    <div>
      <div className="flex">
        {showFollowButton && (
          <button
            disabled={disableInput}
            onClick={onFollowClick}
            className="btn-primary btn-sm btn"
          >
            Follow
          </button>
        )}

        {showUnfollowButton && (
          <button
            disabled={disableInput}
            onClick={onUnFollowClick}
            className="btn-primary btn-sm btn"
          >
            UnFollow
          </button>
        )}
      </div>
    </div>
  )
}

export { FollowUnfollowButton }
