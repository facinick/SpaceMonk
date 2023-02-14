import { MetaTags } from '@redwoodjs/web'
import ContactForm from 'src/components/ContactForm/ContactForm'

const HomePage = () => {

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div className='flex flex-col gap-5 items-center w-full'>
        <ContactForm />
      </div>
    </>
  )
}

export default HomePage
