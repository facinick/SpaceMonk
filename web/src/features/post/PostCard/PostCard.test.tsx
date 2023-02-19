import { render } from '@redwoodjs/testing/web'

import PostCard from './PostCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PostCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <PostCard
          title={''}
          body={''}
          bodyPlainText={''}
          id={0}
          truncated={false}
          createdAt={''}
        />
      )
    }).not.toThrow()
  })
})
