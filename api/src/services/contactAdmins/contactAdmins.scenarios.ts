import type { Prisma, ContactAdmin } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ContactAdminCreateArgs>({
  contactAdmin: {
    one: { data: { name: 'String', message: 'String' } },
    two: { data: { name: 'String', message: 'String' } },
  },
})

export type StandardScenario = ScenarioData<ContactAdmin, 'contactAdmin'>
