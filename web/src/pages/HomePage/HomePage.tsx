import { MetaTags } from '@redwoodjs/web'
import { useAuth } from 'src/auth'
import ActiveUsersCell from 'src/features/admin/ActiveUsersCell'
import ContactAdminsCell from 'src/features/admin/ContactAdminsCell'
import { ContactAdminForm } from 'src/features/contact/ContactAdminForm/ContactAdminForm'

const HomePage = () => {
  const { hasRole } = useAuth()
  const isAdmin = hasRole(['admin'])

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      {!isAdmin && <ContactAdminForm />}
      {isAdmin && (
        <div className="flex flex-col gap-5">
          <ContactAdminsCell />
          <ActiveUsersCell query={{orderBy: {lastSeen: "desc"}}} />
        </div>
      )}
    </>
  )
}

export default HomePage
