// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CommentSection> = (args) => {
//   return <CommentSection {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import { CommentSection } from './CommentSection'

export const generated = () => {
  return <CommentSection comments={[]} postId={0} />
}

export default {
  title: 'features/CommentSection',
  component: CommentSection,
} as ComponentMeta<typeof CommentSection>
