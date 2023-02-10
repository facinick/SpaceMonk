import type { ComponentMeta, ComponentStory } from '@storybook/react'

import ResponsiveLayout from './ResponsiveLayout'

export const generated: ComponentStory<typeof ResponsiveLayout> = (args) => {
  return <ResponsiveLayout {...args} />
}

export default {
  title: 'Layouts/ResponsiveLayout',
  component: ResponsiveLayout,
} as ComponentMeta<typeof ResponsiveLayout>
