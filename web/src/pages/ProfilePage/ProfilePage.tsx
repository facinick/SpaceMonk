import { MetaTags } from '@redwoodjs/web'

//@ts-ignore
import UserProfileCell from 'src/features/profile/UserProfileCell/UserProfileCell'
interface PageProps {
  username: string
}

const ProfilePage = (props: PageProps) => {
  const { username } = props

  return (
    <>
      <MetaTags title="Profile" description="Profile page" />
      <UserProfileCell username={username} />
    </>
  )
}

export default ProfilePage
