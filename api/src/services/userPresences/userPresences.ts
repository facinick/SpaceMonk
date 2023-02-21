import type {
  QueryResolvers,
  MutationResolvers,
  UserPresenceRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

export const userPresences: QueryResolvers['userPresences'] = () => {
  return db.userPresence.findMany({
    include: {
      user: true,
    },
  })
}

export const userPresenceByUserId: QueryResolvers['userPresenceByUserId'] = ({
  userId,
}) => {
  return db.userPresence.findUnique({
    where: { userId },
    include: {
      user: true,
    },
  })
}

export const updateUserPresence: MutationResolvers['updateUserPresence'] =
  async () => {
    requireAuth()

    const userId = context.currentUser.id

    const presence = await db.userPresence.update({
      data: {
        lastSeen: new Date(
          Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            new Date().getUTCDay(),
            new Date().getUTCHours(),
            new Date().getUTCMinutes(),
            new Date().getUTCSeconds()
          )
        ),
      },
      where: { userId },
      select: {
        id: true,
        lastSeen: true,
      },
    })

    return presence
  }

export const UserPresence: UserPresenceRelationResolvers = {
  user: (_obj, { root }) => {
    return db.userPresence.findUnique({ where: { id: root?.id } }).user()
  },
}
