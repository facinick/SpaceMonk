import { MetaTags } from '@redwoodjs/web'
import { useAuth } from 'src/auth'
import { ContactAdminForm } from 'src/features/contact/ContactAdminForm/ContactAdminForm'
import ContactAdminsCell from 'src/features/admin/ContactAdminsCell/ContactAdminsCell'
//@ts-ignore
import ActiveUsersCell from 'src/features/admin/ActiveUsersCell/ActiveUsersCell'

const HomePage = () => {
  const { hasRole, currentUser } = useAuth()
  const isAdmin = hasRole(['admin'])

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      {!isAdmin && <ContactAdminForm />}
      {isAdmin && (
        <div className="flex flex-col gap-5">
          <ContactAdminsCell />
          <ActiveUsersCell />
        </div>
      )}
    </>
  )
}

export default HomePage
