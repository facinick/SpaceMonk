import { MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { FormEvent, useRef } from 'react'
import { MessageIcon, SendRightIcon, UserLoginIcon } from '../../Icons/icons'
import { CREATE_CONTACT_ADMIN_MUTATION } from 'src/graphql/mutations'
import { createContactAdmin } from 'types/graphql'

const Constants = {
  formTitle: 'Ping Admin.. Ping him!',
  name: 'Name',
  namePlaceholder: 'Nick',
  message: 'Message',
  messagePlaceholder: 'Hello',
  submitButtonText: 'Submit',
  submitButtonTextBusy: 'Submitting',
}

const ContactAdminForm = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const [create, { loading }] = useMutation<createContactAdmin>(
    CREATE_CONTACT_ADMIN_MUTATION,
    {
      onCompleted: () => {
        toast.success(`Pinged!`)
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
    const message = formData.get('message')

    const contactFormData = {
      name: name,
      message: message,
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
                  name="name"
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
                  maxLength={200}
                  minLength={10}
                  disabled={disableInput}
                  type="text"
                  name="message"
                  id="message"
                  required
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

export { ContactAdminForm }
