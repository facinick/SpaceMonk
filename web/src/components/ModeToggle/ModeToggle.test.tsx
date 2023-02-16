import { render } from '@redwoodjs/testing/web'

import ModeToggle from './ModeToggle'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ModeToggle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ModeToggle />)
    }).not.toThrow()
  })
})
