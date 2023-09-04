import type { ComponentMeta } from '@storybook/react'

import UsersPage from './UsersPage'

export const generated = () => {
  return <UsersPage />
}

export default {
  title: 'Pages/UsersPage',
  component: UsersPage,
} as ComponentMeta<typeof UsersPage>
