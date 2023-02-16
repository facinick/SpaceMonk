// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ThemeShuffle> = (args) => {
//   return <ThemeShuffle {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ThemeShuffle from './ThemeShuffle'

export const generated = () => {
  return <ThemeShuffle />
}

export default {
  title: 'Components/ThemeShuffle',
  component: ThemeShuffle,
} as ComponentMeta<typeof ThemeShuffle>
