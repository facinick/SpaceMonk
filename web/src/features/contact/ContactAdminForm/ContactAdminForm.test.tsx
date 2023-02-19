import { render } from '@redwoodjs/testing/web'
import { ContactAdminForm } from './ContactAdminForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ContactAdminForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ContactAdminForm />)
    }).not.toThrow()
  })
})
