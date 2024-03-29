import { UserLoginIcon } from 'src/features/Icons/icons'
import FollowUnfollowCell from 'src/features/follow_unfollow/FollowUnfollowCell'
import { useAuthentication } from 'src/hooks/useAuthentication'
import { USER_PROFLIE_BY_USERNAME } from 'types/graphql'
import { UserProfileDataComponent } from '../UserProfileDataComponent/UserProfileDataComponent'
import { UserProfileTabsComponent } from '../UserProfileTabsComponent/UserProfileTabsComponent'
import { AnimatedUsernamBanner } from '../UserProfileUsernameBannerComponent'
interface ComponentProps {
  userProfileByUsername: USER_PROFLIE_BY_USERNAME['userProfileByUsername']
}

const UserProfileComponent = (props: ComponentProps) => {
  const { userProfileByUsername } = props
  const currentUserOfFalse = useAuthentication({})

  const isLoggedIn = currentUserOfFalse!!

  // true => my profile
  // false => my profile and im not logged in OR not my profile and im not logged in
  const isMyProfile =
  isLoggedIn &&
  currentUserOfFalse.username === userProfileByUsername.user.username
  
  console.log(isMyProfile)
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
      {isLoggedIn && !isMyProfile && (
        <FollowUnfollowCell
          username={currentUserOfFalse && currentUserOfFalse.username}
          userProfile={userProfileByUsername}
        />
      )}

      {/* TABS */}
      <div className="w-full flex flex-col gap-8">
        <UserProfileTabsComponent />
        
        <UserProfileDataComponent username={userProfileByUsername.user.username} />
      </div>
    </div>
  )
}

export default UserProfileComponent
