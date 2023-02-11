// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof PageTitle> = (args) => {
//   return <PageTitle {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import PageTitle from './PageTitle'

export const generated = () => {
  return <PageTitle />
}

export default {
  title: 'Components/PageTitle',
  component: PageTitle,
} as ComponentMeta<typeof PageTitle>
