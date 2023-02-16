import { FormEvent, useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const Constants = {
  formTitle: 'Admin Sign In',
  username: 'Username',
  usernamePlaceholder: 'Username',
  password: 'Password',
  passwordPlaceholder: '••••••••',
  signInButtonText: 'Sign In'
}

const LoginPage = () => {
  const { isAuthenticated, logIn, loading, hasError, error } = useAuth()

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);

    const username = formData.get('username')
    const password = formData.get('password')

    const response = await logIn({ username, password })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  const disableInputs = loading

  return (
    <>
      <MetaTags title="Login" />
      <div className="w-full rounded-lg sm:max-w-md bg-base-100">
        <div className="p-6 space-y-4">

          <h1 className="text-xl font-bold">
            {Constants.formTitle}
          </h1>

          <form ref={formRef} onSubmit={onSubmit} className="space-y-4" action="#">
            <div>
            <label htmlFor="username" className="label">
              <span className="label-text">{Constants.username}</span>
            </label>
            <input disabled={disableInputs} type="text" name="username" id="username" className="input input-bordered w-full" placeholder={Constants.usernamePlaceholder} required={true} />
            </div>
            <div>
            <label htmlFor="password" className="label">
              <span className="label-text">{Constants.password}</span>
            </label>
            <input disabled={disableInputs} type="password" name="password" id="password" className="input input-bordered w-full" placeholder={Constants.passwordPlaceholder} required={true} />
            </div>
            <button disabled={disableInputs} type="submit" className="btn btn-primary btn-sm">{Constants.signInButtonText}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage
