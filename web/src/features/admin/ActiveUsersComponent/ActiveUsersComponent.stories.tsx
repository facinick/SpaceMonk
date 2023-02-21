// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ActiveUsersComponent> = (args) => {
//   return <ActiveUsersComponent {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ActiveUsersComponent from './ActiveUsersComponent'

export const generated = () => {
  return <ActiveUsersComponent />
}

export default {
  title: 'Components/ActiveUsersComponent',
  component: ActiveUsersComponent,
} as ComponentMeta<typeof ActiveUsersComponent>
