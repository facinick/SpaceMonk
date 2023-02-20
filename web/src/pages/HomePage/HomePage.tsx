import { MetaTags } from '@redwoodjs/web'
import { ContactAdminForm } from 'src/features/contact/ContactAdminForm/ContactAdminForm'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <ContactAdminForm />
    </>
  )
}

export default HomePage
