import { MetaTags } from '@redwoodjs/web'
import { useAuth } from 'src/auth'
import { ContactAdminForm } from 'src/features/contact/ContactAdminForm/ContactAdminForm'
import ContactAdminsCell from 'src/features/admin/ContactAdminsCell/ContactAdminsCell'

const HomePage = () => {
  const { hasRole, currentUser } = useAuth()
  const isAdmin = hasRole(['admin'])

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      {!isAdmin && <ContactAdminForm />}
      {isAdmin && <ContactAdminsCell />}
    </>
  )
}

export default HomePage
