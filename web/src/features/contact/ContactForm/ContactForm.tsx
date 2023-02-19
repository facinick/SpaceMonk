import { MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { createContact } from 'types/graphql'
import { FormEvent, useRef } from 'react'
import { CREATE_CONTACT_MUTATION } from 'src/graphql/mutations'
import {
  UserLoginIcon,
  PhoneIcon,
  MessageIcon,
  SendRightIcon,
} from 'src/features/Icons/icons'

const Constants = {
  formTitle: 'Ping Admin',
  name: 'Name',
  namePlaceholder: 'Nick',
  phone: 'Phone',
  phonePlaceholder: '9283746372 (10 Digits)',
  message: 'Message',
  messagePlaceholder: 'Leave blank to just get a call back!',
  submitButtonText: 'Submit',
  submitButtonTextBusy: 'Submitting',
}

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const [create, { loading }] = useMutation<createContact>(
    CREATE_CONTACT_MUTATION,
    {
      onCompleted: () => {
        toast.success(`Submitted! You'll get a call back shortly!`)
      },
      onError: () => {
        toast.error(`Couldn't submit, don't know why!`)
      },
    }
  )

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    const formData = new FormData(formRef.current)

    const name = formData.get('name')
    const phone = formData.get('phone')
    const message = formData.get('message')

    const contactFormData = {
      name: name,
      phone: phone,
      ...(message !== '' && { message: message }),
    }

    create({ variables: { input: contactFormData } })
  }

  const disableInput = loading
  const submitting = loading

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <div className="w-full rounded-lg bg-base-100 sm:max-w-md">
        <div className="space-y-4 p-6">
          <h1 className="text-xl font-bold">{Constants.formTitle}</h1>

          <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="label">
                <span className="label-text">{Constants.name}</span>
              </label>
              <label className="input-group">
                <span>
                  <UserLoginIcon />
                </span>
                <input
                  type="text"
                  disabled={disableInput}
                  id="name"
                  placeholder={Constants.namePlaceholder}
                  className="input-bordered input w-full"
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="phone" className="label">
                <span className="label-text">{Constants.phone}</span>
              </label>
              <label className="input-group">
                <span>
                  <PhoneIcon />
                </span>
                <input
                  type="text"
                  disabled={disableInput}
                  id="phone"
                  placeholder={Constants.phonePlaceholder}
                  className="input-bordered input w-full"
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="message" className="label">
                <span className="label-text">{Constants.message}</span>
              </label>

              <label className="input-group">
                <span>
                  <MessageIcon />
                </span>
                <input
                  max={200}
                  disabled={disableInput}
                  type="text"
                  id="message"
                  placeholder={Constants.messagePlaceholder}
                  className="input-bordered input w-full"
                />
              </label>
            </div>
            <button
              disabled={disableInput}
              type="submit"
              className="btn btn-primary btn-sm gap-2"
            >
              {submitting
                ? Constants.submitButtonTextBusy
                : Constants.submitButtonText}{' '}
              <SendRightIcon />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ContactForm
