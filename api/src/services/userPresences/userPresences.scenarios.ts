import type { Prisma, UserPresence } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserPresenceCreateArgs>({
  userPresence: {
    one: {
      data: {
        user: {
          create: {
            username: 'String7634735',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-02-21T14:22:31.994Z',
          },
        },
      },
    },
    two: {
      data: {
        user: {
          create: {
            username: 'String8321169',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-02-21T14:22:31.994Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserPresence, 'userPresence'>
