// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ImageLoaderAndViewer> = (args) => {
//   return <ImageLoaderAndViewer {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ImageLoaderAndViewer from './ImageLoaderAndViewer'

export const generated = () => {
  return <ImageLoaderAndViewer />
}

export default {
  title: 'Components/ImageLoaderAndViewer',
  component: ImageLoaderAndViewer,
} as ComponentMeta<typeof ImageLoaderAndViewer>
