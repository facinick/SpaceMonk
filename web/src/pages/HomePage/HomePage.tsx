import { MetaTags } from '@redwoodjs/web'
import ContactForm from 'src/components/ContactForm/ContactForm'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <ContactForm />
    </>
  )
}

export default HomePage
