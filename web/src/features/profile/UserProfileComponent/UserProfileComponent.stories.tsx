// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof UserProfileComponent> = (args) => {
//   return <UserProfileComponent {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import UserProfileComponent from './UserProfileComponent'

export const generated = () => {
  return <UserProfileComponent />
}

export default {
  title: 'Components/UserProfileComponent',
  component: UserProfileComponent,
} as ComponentMeta<typeof UserProfileComponent>
