import type { ComponentMeta } from '@storybook/react'

import PostPage from './PostPage'

export const generated = () => {
  return <PostPage id={0} />
}

export default {
  title: 'Pages/PostPage',
  component: PostPage,
} as ComponentMeta<typeof PostPage>
