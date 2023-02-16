// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof PostCardBigCommentSection> = (args) => {
//   return <PostCardBigCommentSection {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import PostCardBigCommentSection from './PostCardBigCommentSection'

export const generated = () => {
  return <PostCardBigCommentSection />
}

export default {
  title: 'Components/PostCardBigCommentSection',
  component: PostCardBigCommentSection,
} as ComponentMeta<typeof PostCardBigCommentSection>
