import type { Prisma, Tag } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TagCreateArgs>({
  tag: {
    one: {
      data: { name: 'String2827635', updatedAt: '2023-09-02T17:06:10.348Z' },
    },
    two: {
      data: { name: 'String852017', updatedAt: '2023-09-02T17:06:10.348Z' },
    },
  },
})

export type StandardScenario = ScenarioData<Tag, 'tag'>
