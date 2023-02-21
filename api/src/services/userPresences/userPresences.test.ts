import type { UserPresence } from '@prisma/client'

import {
  userPresences,
  userPresence,
  createUserPresence,
  updateUserPresence,
  deleteUserPresence,
} from './userPresences'
import type { StandardScenario } from './userPresences.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userPresences', () => {
  scenario('returns all userPresences', async (scenario: StandardScenario) => {
    const result = await userPresences()

    expect(result.length).toEqual(Object.keys(scenario.userPresence).length)
  })

  scenario(
    'returns a single userPresence',
    async (scenario: StandardScenario) => {
      const result = await userPresence({ id: scenario.userPresence.one.id })

      expect(result).toEqual(scenario.userPresence.one)
    }
  )

  scenario('creates a userPresence', async (scenario: StandardScenario) => {
    const result = await createUserPresence({
      input: { userId: scenario.userPresence.two.userId },
    })

    expect(result.userId).toEqual(scenario.userPresence.two.userId)
  })

  scenario('updates a userPresence', async (scenario: StandardScenario) => {
    const original = (await userPresence({
      id: scenario.userPresence.one.id,
    })) as UserPresence
    const result = await updateUserPresence({
      id: original.id,
      input: { userId: scenario.userPresence.two.userId },
    })

    expect(result.userId).toEqual(scenario.userPresence.two.userId)
  })

  scenario('deletes a userPresence', async (scenario: StandardScenario) => {
    const original = (await deleteUserPresence({
      id: scenario.userPresence.one.id,
    })) as UserPresence
    const result = await userPresence({ id: original.id })

    expect(result).toEqual(null)
  })
})
