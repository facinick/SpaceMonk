import { render } from '@redwoodjs/testing/web'

import NoProsePostLayout from './NoProsePostLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NoProsePostLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NoProsePostLayout />)
    }).not.toThrow()
  })
})
