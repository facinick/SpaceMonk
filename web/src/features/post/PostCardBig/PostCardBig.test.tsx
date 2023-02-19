import { render } from '@redwoodjs/testing/web'

import PostCardBig from './PostCardBig'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PostCardBig', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <PostCardBig
          post={{
            __typename: 'Post',
            id: 0,
            title: '',
            body: '',
            headerImageUrl: '',
            createdAt: '',
            score: 0,
            updatedAt: '',
            author: {
              __typename: 'User',
              id: 0,
              username: '',
            },
            votes: [],
          }}
        />
      )
    }).not.toThrow()
  })
})
