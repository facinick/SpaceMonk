import { FormEvent, useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const Constants = {
  formTitle: 'Admin Sign Up',
  username: 'Username',
  usernamePlaceholder: 'Username',
  password: 'Password',
  passwordPlaceholder: '••••••••',
  signUpButtonText: 'Sign Up'
}

const SignupPage = () => {
  const { isAuthenticated, signUp, loading, hasError, error } = useAuth()

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on username box on page load
  const usernameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);

    const username = formData.get('username')
    const password = formData.get('password')

    const response = await signUp({ username, password})

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome!')
    }
  }

  const disableInputs = loading

  return (
    <>
      <MetaTags title="Signup" />

      {/* <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> */}
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {Constants.formTitle}
              </h1>

              <form ref={formRef} onSubmit={onSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{Constants.username}</label>
                  <input disabled={disableInputs} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={Constants.usernamePlaceholder} required={true} />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{Constants.password}</label>
                  <input disabled={disableInputs} type="password" name="password" id="password" placeholder={Constants.passwordPlaceholder} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                </div>
                <button disabled={disableInputs} type="submit" className="btn btn-primary">{Constants.signUpButtonText}</button>
              </form>
            </div>
          </div>
        {/* </div>
      </section> */}
    </>
  )
}

export default SignupPage
