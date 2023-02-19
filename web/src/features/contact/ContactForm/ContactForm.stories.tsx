// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ContactForm> = (args) => {
//   return <ContactForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ContactForm from './ContactForm'

export const generated = () => {
  return <ContactForm />
}

export default {
  title: 'features/ContactForm',
  component: ContactForm,
} as ComponentMeta<typeof ContactForm>
