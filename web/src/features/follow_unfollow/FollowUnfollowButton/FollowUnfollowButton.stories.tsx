// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof FollowUnfollowButton> = (args) => {
//   return <FollowUnfollowButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import FollowUnfollowButton from './FollowUnfollowButton'

export const generated = () => {
  return <FollowUnfollowButton />
}

export default {
  title: 'Components/FollowUnfollowButton',
  component: FollowUnfollowButton,
} as ComponentMeta<typeof FollowUnfollowButton>
