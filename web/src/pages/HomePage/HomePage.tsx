import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { NewPostEditor } from 'src/components/Admin/Post/NewPostEditor/NewPostEditor'
import ContactForm from 'src/components/ContactForm/ContactForm'

const HomePage = () => {
  const { hasRole, currentUser } = useAuth()

  const isAdmin = hasRole(['admin'])

  console.log(currentUser)

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <ContactForm />
      {isAdmin && <NewPostEditor />}
    </>
  )
}

export default HomePage
