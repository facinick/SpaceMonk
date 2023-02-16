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

  const onSubmit = (event: FormEvent) => {
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

      <div className="w-full rounded-lg sm:max-w-md bg-base-100">
        <div className="p-6 space-y-4">
          <h1 className="text-xl font-bold">
            {Constants.formTitle}
          </h1>

          <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="label">
                <span className="label-text">{Constants.name}</span>
              </label>
              <label className="input-group">
                <span> &#8491;</span>
                <input type="text" disabled={disableInput} pattern='/^[6-9]\d{9}$/' id="name" placeholder={Constants.namePlaceholder} className="input input-bordered w-full" required />
              </label>
            </div>
            <div>
              <label htmlFor="phone" className="label">
                <span className="label-text">{Constants.phone}</span>
              </label>
              <label className="input-group">
                <span> &#9742;</span>
                <input type="text" disabled={disableInput} pattern='/^[6-9]\d{9}$/' id="phone" placeholder={Constants.phonePlaceholder} className="input input-bordered w-full" required />
              </label>
            </div>
            <div>
              <label htmlFor="message" className="label">
                <span className="label-text">{Constants.message}</span>
              </label>

              <label className="input-group">
                <span>  &#9993;</span>
                <input max={200} disabled={disableInput} type="text" id="message" placeholder={Constants.messagePlaceholder} className="input input-bordered w-full" />
              </label>
            </div>
            <button disabled={disableInput} type="submit" className="btn btn-primary btn-sm">{submitting ? Constants.submitButtonTextBusy : Constants.submitButtonText}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ContactForm
