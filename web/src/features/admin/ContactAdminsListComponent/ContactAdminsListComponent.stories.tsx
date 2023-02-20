// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ContactAdminsListComponent> = (args) => {
//   return <ContactAdminsListComponent {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import { ContactAdminsListComponent } from './ContactAdminsListComponent'

export const generated = () => {
  return <ContactAdminsListComponent />
}

export default {
  title: 'Components/ContactAdminsListComponent',
  component: ContactAdminsListComponent,
} as ComponentMeta<typeof ContactAdminsListComponent>
