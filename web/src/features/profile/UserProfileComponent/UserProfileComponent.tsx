import { UserLoginIcon } from 'src/features/Icons/icons'
import { useAuthentication } from 'src/hooks/useAuthentication'
import { USER_PROFLIE_BY_USERNAME } from 'types/graphql'
import { AnimatedUsernamBanner } from '../UserProfileUsernameBannerComponent'
import FollowUnfollowCell from 'src/features/follow_unfollow/FollowUnfollowCell'
interface ComponentProps {
  userProfileByUsername: USER_PROFLIE_BY_USERNAME['userProfileByUsername']
}

const UserProfileComponent = (props: ComponentProps) => {
  const { userProfileByUsername } = props
  const currentUserOfFalse = useAuthentication({})

  const isLoggedInUserProfile =
    currentUserOfFalse &&
    currentUserOfFalse.username === userProfileByUsername.user.username

  const fallbackAvatar = !userProfileByUsername.profilePictureUrl

  return (
    <div className="w-full max-w-[768px]">
      {/* PROFILE */}
      <div className="relative aspect-[15/10] sm:aspect-[30/10]">
        {/* PROFILE > AVATAR */}
        <div className="avatar absolute left-1/2 bottom-0 z-10 -translate-x-1/2 translate-y-1/2 transform rounded-full">
          <div className="w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
            {!fallbackAvatar && (
              <img src={userProfileByUsername.profilePictureUrl} />
            )}
            {fallbackAvatar && <UserLoginIcon w={'100%'} h={'100%'} />}
          </div>
        </div>

        {/* PROFILE > HEADER */}
        <div className="absolute h-full w-full">
          <img
            className="h-full w-full object-cover"
            src={userProfileByUsername.headerImageUrl}
          />
          {/* PROFILE > HEADER > BANNER */}
          <AnimatedUsernamBanner
            username={userProfileByUsername.user.username}
          />
        </div>
      </div>

      {/* FOLLOW UNFOLLOW */}
      <div className="h-20"></div>
      {!isLoggedInUserProfile && (
        <FollowUnfollowCell
          username={currentUserOfFalse && currentUserOfFalse.username}
          userProfile={userProfileByUsername}
        />
      )}
    </div>
  )
}

export default UserProfileComponent
