import { MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import {
  CreateContactInput
} from 'types/graphql'
import { FormEvent, useRef } from 'react'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const Constants = {
  formTitle: 'Request Call Back',
  name: 'Name',
  namePlaceholder: 'Nick',
  phone: 'Phone',
  phonePlaceholder: '9283746372 (10 Digit Indian Phone Number)',
  message: 'Message',
  messagePlaceholder: 'Leave blank to just get a call back!',
  submitButtonText: 'Submit',
  submitButtonTextBusy: 'Submitting'
}

const inputClass = "rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-600 dark:focus:border-primary-600"
const iconClass = "inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"

const ContactForm = () => {

  const formRef = useRef<HTMLFormElement>(null);

  const [create, { loading }] = useMutation<CreateContactInput>(CREATE_CONTACT,
    {
      onCompleted: () => {
        toast.success(`Submitted! You'll get a call back shortly!`)
      },
      onError: () => {
        toast.error(`Couldn't submit, don't know why!`)
      }
    })

  const onSubmit = (event:FormEvent) => {
    event.preventDefault()

    const formData = new FormData(formRef.current);

    const name = formData.get('name')
    const phone = formData.get('phone')
    const message = formData.get('message')

    const contactFormData = {
      name: name,
      phone: phone,
      ...(message !== "" && { message: message })
    }

    create({ variables: { input: contactFormData } },)
  }

  const disableInput = loading
  const submitting = loading

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      {/* <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> */}
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {Constants.formTitle}
              </h1>

              <form ref={formRef} onSubmit={onSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{Constants.name}</label>
                  <div className="flex">
                    <span className={iconClass}>
                      &#8491;
                    </span>
                    <input disabled={disableInput} type="text" id="name" className={inputClass} placeholder={Constants.namePlaceholder} required />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{Constants.phone}</label>
                  <div className="flex">
                    <span className={iconClass}>
                      &#9742;
                    </span>
                    <input pattern='/^[6-9]\d{9}$/' disabled={disableInput} type="text" id="phone" className={inputClass} placeholder={Constants.phonePlaceholder} required />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{Constants.message}</label>
                  <div className="flex">
                    <span className={iconClass}>
                      &#9993;
                    </span>
                    <input max={200} disabled={disableInput} type="text" id="message" className={inputClass} placeholder={Constants.messagePlaceholder} />
                  </div>
                </div>
                <button disabled={disableInput} type="submit" className="text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-600 dark:focus:ring-primary-800">{submitting ? Constants.submitButtonTextBusy : Constants.submitButtonText}</button>
              </form>
            </div>
          </div>
        {/* </div>
      </section> */}

    </>
  )
}

export default ContactForm
