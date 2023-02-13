import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { NewPostEditor } from 'src/components/Admin/Post/NewPostEditor/NewPostEditor'
import ContactForm from 'src/components/ContactForm/ContactForm'

const HomePage = () => {
  const { hasRole } = useAuth()

  const isAdmin = hasRole(['admin'])

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div className='flex flex-col gap-5 items-center'>
        {isAdmin && <NewPostEditor />}
        <ContactForm />
      </div>
    </>
  )
}

export default HomePage
