import { render } from '@redwoodjs/testing/web'

import { FollowUnfollowButton } from './FollowUnfollowButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FollowUnfollowButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <FollowUnfollowButton
          followingByUsername={[]}
          userProfile={{
            __typename: 'UserProfile',
            id: 0,
            bio: '',
            profilePictureUrl: '',
            headerImageUrl: '',
            name: '',
            age: '',
            city: '',
            interests: '',
            user: {
              __typename: 'User',
              username: '',
            },
          }}
        />
      )
    }).not.toThrow()
  })
})
