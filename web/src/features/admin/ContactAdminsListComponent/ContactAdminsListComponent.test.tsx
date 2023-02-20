import { render } from '@redwoodjs/testing/web'

import { ContactAdminsListComponent } from './ContactAdminsListComponent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ContactAdminsListComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ContactAdminsListComponent />)
    }).not.toThrow()
  })
})
