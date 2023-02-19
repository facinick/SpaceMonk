import type { ComponentMeta, ComponentStory } from '@storybook/react'

import NoProsePostLayout from './NoProsePostLayout'

export const generated: ComponentStory<typeof NoProsePostLayout> = (args) => {
  return <NoProsePostLayout {...args} />
}

export default {
  title: 'Layouts/NoProsePostLayout',
  component: NoProsePostLayout,
} as ComponentMeta<typeof NoProsePostLayout>
