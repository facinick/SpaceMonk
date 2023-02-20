import type { Prisma, UserProfile } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserProfileCreateArgs>({
  userProfile: {
    one: {
      data: {
        User: {
          create: {
            username: 'String7858446',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-02-20T19:31:18.088Z',
          },
        },
      },
    },
    two: {
      data: {
        User: {
          create: {
            username: 'String9927693',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-02-20T19:31:18.088Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserProfile, 'userProfile'>
