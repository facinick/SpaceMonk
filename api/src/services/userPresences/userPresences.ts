import type {
  QueryResolvers,
  MutationResolvers,
  UserPresenceRelationResolvers,
  QueryuserPresencesArgs,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { removeUndefinedKeys } from '../posts/posts'

const OrderByVKey = ['lastSeen']
const OrderByVOrder = ['asc', 'desc']

const parseQueryForPrisma = (
  query: QueryuserPresencesArgs['query']
): Partial<Omit<QueryuserPresencesArgs['query'], '__typename'>> => {
  let orderByByQuery: Partial<{
    orderBy: Record<
      QueryuserPresencesArgs['query']['orderBy']['key'],
      QueryuserPresencesArgs['query']['orderBy']['order']
    >
  }> = {
    orderBy: {},
  }

  if (
    query &&
    query.orderBy &&
    query.orderBy.key &&
    query.orderBy.order &&
    OrderByVKey.includes(query.orderBy.key) &&
    OrderByVOrder.includes(query.orderBy.order)
  ) {
    orderByByQuery.orderBy[query.orderBy.key] = query.orderBy.order
  } else {
    orderByByQuery = {}
  }

  // @ts-ignore
  return removeUndefinedKeys({
    ...orderByByQuery,
  })
}

export const userPresences: QueryResolvers['userPresences'] = ({ query }) => {
  const prismaQuery = parseQueryForPrisma(query)
  console.log(prismaQuery)

  // @ts-ignore
  return db.userPresence.findMany({
    ...prismaQuery,
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
