import type { ContactAdmin } from '@prisma/client'

import {
  contactAdmins,
  contactAdmin,
  createContactAdmin,
  updateContactAdmin,
  deleteContactAdmin,
} from './contactAdmins'
import type { StandardScenario } from './contactAdmins.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('contactAdmins', () => {
  scenario('returns all contactAdmins', async (scenario: StandardScenario) => {
    const result = await contactAdmins()

    expect(result.length).toEqual(Object.keys(scenario.contactAdmin).length)
  })

  scenario(
    'returns a single contactAdmin',
    async (scenario: StandardScenario) => {
      const result = await contactAdmin({ id: scenario.contactAdmin.one.id })

      expect(result).toEqual(scenario.contactAdmin.one)
    }
  )

  scenario('creates a contactAdmin', async () => {
    const result = await createContactAdmin({
      input: { name: 'String', message: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.message).toEqual('String')
  })

  scenario('updates a contactAdmin', async (scenario: StandardScenario) => {
    const original = (await contactAdmin({
      id: scenario.contactAdmin.one.id,
    })) as ContactAdmin
    const result = await updateContactAdmin({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a contactAdmin', async (scenario: StandardScenario) => {
    const original = (await deleteContactAdmin({
      id: scenario.contactAdmin.one.id,
    })) as ContactAdmin
    const result = await contactAdmin({ id: original.id })

    expect(result).toEqual(null)
  })
})
