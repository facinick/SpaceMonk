import { render } from '@redwoodjs/testing/web'

import ActiveUsersComponent from './ActiveUsersComponent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ActiveUsersComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ActiveUsersComponent />)
    }).not.toThrow()
  })
})
