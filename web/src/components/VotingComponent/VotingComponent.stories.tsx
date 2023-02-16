// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof VotingComponent> = (args) => {
//   return <VotingComponent {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import VotingComponent from './VotingComponent'

export const generated = () => {
  return <VotingComponent />
}

export default {
  title: 'Components/VotingComponent',
  component: VotingComponent,
} as ComponentMeta<typeof VotingComponent>
