// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ContactAdminForm> = (args) => {
//   return <ContactAdminForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ContactAdminForm from './ContactAdminForm'

export const generated = () => {
  return <ContactAdminForm />
}

export default {
  title: 'Components/ContactAdminForm',
  component: ContactAdminForm,
} as ComponentMeta<typeof ContactAdminForm>
