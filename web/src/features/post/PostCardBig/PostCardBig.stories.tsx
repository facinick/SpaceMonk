// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof PostCardBig> = (args) => {
//   return <PostCardBig {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import PostCardBig from './PostCardBig'

export const generated = () => {
  return (
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
}

export default {
  title: 'features/PostCardBig',
  component: PostCardBig,
} as ComponentMeta<typeof PostCardBig>
