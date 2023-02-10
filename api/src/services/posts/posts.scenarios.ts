import type { Prisma, Post } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: {
      data: {
        title: 'String',
        body: 'String',
        updatedAt: '2023-02-10T17:30:03.716Z',
      },
    },
    two: {
      data: {
        title: 'String',
        body: 'String',
        updatedAt: '2023-02-10T17:30:03.716Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Post, 'post'>
