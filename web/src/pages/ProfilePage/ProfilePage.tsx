import { MetaTags } from '@redwoodjs/web'
import { useMemo } from 'react'
import UserProfileCell from 'src/features/profile/UserProfileCell'

//@ts-ignore
interface PageProps {
  username: string
}

const ProfilePage = (props: PageProps) => {
  const { username } = props

  const profileCell = useMemo(
    () => <UserProfileCell username={username} />,
    [username]
  )

  return (
    <>
      <MetaTags title="Profile" description="Profile page" />
      {profileCell}
    </>
  )
}

export default ProfilePage
