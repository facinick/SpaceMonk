import { MetaTags } from '@redwoodjs/web'
import UsersCell from "src/features/users/UsersCell"
const UsersPage = () => {
  return (
    <>
      <MetaTags title="Users" description="Users page" />

      <UsersCell></UsersCell>
    </>
  )
}

export default UsersPage
