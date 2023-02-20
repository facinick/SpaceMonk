import { render } from '@redwoodjs/testing/web'

import UserProfileComponent from './UserProfileComponent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserProfileComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserProfileComponent />)
    }).not.toThrow()
  })
})
