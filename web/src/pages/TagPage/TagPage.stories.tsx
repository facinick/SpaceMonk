import type { ComponentMeta } from '@storybook/react'

import TagPage from './TagPage'

export const generated = () => {
  return <TagPage />
}

export default {
  title: 'Pages/TagPage',
  component: TagPage,
} as ComponentMeta<typeof TagPage>
