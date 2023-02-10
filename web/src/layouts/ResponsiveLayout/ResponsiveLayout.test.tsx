import { render } from '@redwoodjs/testing/web'

import ResponsiveLayout from './ResponsiveLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ResponsiveLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ResponsiveLayout />)
    }).not.toThrow()
  })
})
