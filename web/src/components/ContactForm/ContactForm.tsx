import { MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import {
  FieldError,
  Form,
  Label,
  TextField,
  TextAreaField,
  Submit,
  SubmitHandler,
  FormError,
} from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'

import {
  CreateContactInput
} from 'types/graphql'

interface FormValues {
  name: string
  phone: string
  message: string
}

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactForm = () => {

  const [create, { loading, error }] = useMutation<CreateContactInput>(CREATE_CONTACT,
    {
      onCompleted: () => {
        toast.success(`Submitted! You'll get a call back shortly!`)
      },
      onError: () => {
        toast.error(`Couldn't submit, don't know why!`)
      }
    })

  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event.preventDefault()
    const contactFormData = {
      name: data.name,
      phone: data.phone,
      ...(data.message !== "" && { message: data.message })
    }

    create({ variables: { input: contactFormData } },)
  }

  const disableInput = loading
  const submitting = loading

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Form className='flex flex-col outline' onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
      <FormError error={error} wrapperClassName="form-error" />
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          name="name"
          validation={{ required: true }}
          errorClassName="error"
          disabled={disableInput}
          className='outline'
        />
        <FieldError name="name" className="error" />

        <Label name="phone" errorClassName="error">
          Phone (+91 India Only)
        </Label>
        <TextField
          name="phone"
          validation={{
            required: true, pattern: {
              value: /^[6-9]\d{9}$/,
              message: 'Please enter a valid Indian phone number (10 digits)',
            }
          }}
          className='outline'
          errorClassName="error"
          disabled={disableInput}
        />
        <FieldError name="phone" className="error" />

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField
          name="message"
          validation={{ required: false, max: 200 }}
          errorClassName="error"
          placeholder='Leave blank to get a call back'
          disabled={disableInput}
          className='outline'
        />
        <FieldError name="message" className="error" />

        <Submit disabled={disableInput}>{submitting ? "Submitting..." : "Submit"}</Submit>
      </Form>
    </>
  )
}

export default ContactForm
