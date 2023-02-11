import { render } from '@redwoodjs/testing/web'

import PostCardBig from './PostCardBig'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PostCardBig', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PostCardBig />)
    }).not.toThrow()
  })
})
