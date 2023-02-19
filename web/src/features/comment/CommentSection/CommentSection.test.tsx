import { render } from '@redwoodjs/testing/web'

import { CommentSection } from './CommentSection'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CommentSection', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CommentSection comments={[]} postId={0} />)
    }).not.toThrow()
  })
})
