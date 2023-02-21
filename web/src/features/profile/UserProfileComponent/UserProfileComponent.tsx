import { useEffect, useRef, useState } from 'react'
import { UserLoginIcon } from 'src/features/Icons/icons'
import { USER_PROFLIE_BY_USERNAME } from 'types/graphql'

interface ComponentProps {
  userProfileByUsername: USER_PROFLIE_BY_USERNAME['userProfileByUsername']
}

const AnimatedUsernamBanner = ({ username }: { username: string }) => {
  const unitRef = useRef<HTMLParagraphElement>(null)
  const [width, setWidth] = useState<number>()

  useEffect(() => {
    if (unitRef?.current) {
      setWidth(unitRef?.current.clientWidth + 16)
    }
  }, [unitRef])

  return (
    <div className="parent relative h-6 w-full overflow-hidden">
      <div className=" absolute top-0 left-0 flex h-full items-center gap-4">
        <p
          ref={unitRef}
          className="first parallelogram_clip pointer-events-none bg-accent px-5"
        >
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
        <p className="parallelogram_clip pointer-events-none bg-accent px-5">
          <span className="text-accent-content">@{username}</span>
        </p>
      </div>
      <style>
        {`
          @keyframes scroll {
            0% {
                margin-left: 0px;
            }
            100% {
              margin-left: -${width}px;
            }
          }
          .first {
            animation: scroll 8s linear infinite;
          }
        `}
      </style>
    </div>
  )
}

const UserProfileComponent = (props: ComponentProps) => {
  const { userProfileByUsername } = props

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
    </div>
  )
}

export default UserProfileComponent
