import { render } from '@redwoodjs/testing/web'

import PostCardBigCommentSection from './PostCardBigCommentSection'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PostCardBigCommentSection', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PostCardBigCommentSection />)
    }).not.toThrow()
  })
})
