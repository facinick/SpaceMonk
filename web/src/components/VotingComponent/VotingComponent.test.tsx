import { render } from '@redwoodjs/testing/web'

import VotingComponent from './VotingComponent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('VotingComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VotingComponent />)
    }).not.toThrow()
  })
})
