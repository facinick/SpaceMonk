import type { Prisma, Contact } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ContactCreateArgs>({
  contact: {
    one: { data: { name: 'String', phone: 'String' } },
    two: { data: { name: 'String', phone: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Contact, 'contact'>
