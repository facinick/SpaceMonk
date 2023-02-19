// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof PostCard> = (args) => {
//   return <PostCard {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import PostCard from './PostCard'

export const generated = () => {
  return (
    <PostCard
      title={''}
      body={''}
      bodyPlainText={''}
      id={0}
      truncated={false}
      createdAt={''}
    />
  )
}

export default {
  title: 'features/PostCard',
  component: PostCard,
} as ComponentMeta<typeof PostCard>
