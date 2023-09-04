import type { ComponentMeta } from '@storybook/react'

import TagsPage from './TagsPage'

export const generated = () => {
  return <TagsPage />
}

export default {
  title: 'Pages/TagsPage',
  component: TagsPage,
} as ComponentMeta<typeof TagsPage>
