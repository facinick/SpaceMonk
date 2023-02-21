import type { Prisma, Follows } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FollowsCreateArgs>({
  follows: {
    one: {
      data: {
        follower: {
          create: {
            username: 'String8655187',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-02-21T18:17:59.241Z',
          },
        },
        following: {
          create: {
            username: 'String1090189',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-02-21T18:17:59.241Z',
          },
        },
      },
    },
    two: {
      data: {
        follower: {
          create: {
            username: 'String5640237',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-02-21T18:17:59.241Z',
          },
        },
        following: {
          create: {
            username: 'String3626336',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-02-21T18:17:59.241Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Follows, 'follows'>
