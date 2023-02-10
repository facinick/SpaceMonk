import type { ComponentMeta } from '@storybook/react'

import BlogPage from './BlogPage'

export const generated = () => {
  return <BlogPage />
}

export default {
  title: 'Pages/BlogPage',
  component: BlogPage,
} as ComponentMeta<typeof BlogPage>
