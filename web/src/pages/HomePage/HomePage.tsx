import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ContactForm from 'src/components/ContactForm/ContactForm'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>HomePage</h1>
      <ContactForm />
    </>
  )
}

export default HomePage
