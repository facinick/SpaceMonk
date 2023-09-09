import type {
  MutationResolvers,
  QueryResolvers,
  UserPresenceRelationResolvers,
  UserPresencesSortOrder
} from 'types/graphql';

import { requireAuth } from 'src/lib/auth';
import { db } from 'src/lib/db';

export const userPresences: QueryResolvers['userPresences'] = async ({ query }) => {
  const { first, after, orderBy } = query || {};
  let cursorWhere = undefined;

  // Handle pagination using the "after" cursor
  if (after) {
    cursorWhere = { id: parseInt(after, 10) };
  }

  // Build the "where" object for filtering by username
  const where = {}

  // Fetch users with pagination, filtering, and ordering
  const userPresences = await db.userPresence.findMany({
    where,
    skip: cursorWhere ? 1 : undefined, // Skip the first item when using "after"
    take: first,
    cursor: cursorWhere ? { id: cursorWhere.id } : undefined, // Use the cursor for pagination
    orderBy: orderBy
      ? {
        ...(orderBy.lastSeen && {
          lastSeen: orderBy.lastSeen === "desc" ? 'desc' : 'asc' as UserPresencesSortOrder,
        }),
      }
      : undefined,
    include: {
      user: true,
    },
  });

  // Calculate cursors for pageInfo
  const startCursor = userPresences.length > 0 ? userPresences[0].id.toString() : null;
  const endCursor =
    userPresences.length > 0 ? userPresences[userPresences.length - 1].id.toString() : null;

  return {
    edges: userPresences.map((userPresences) => ({
      cursor: userPresences.id.toString(),
      node: userPresences,
    })),
    pageInfo: {
      hasNextPage: userPresences.length === first, // If there are more items to paginate
      hasPreviousPage: !!after, // If there are previous items
      startCursor,
      endCursor,
    },
  };
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
        userId: true
      },
    })

    return presence
  }

export const UserPresence: UserPresenceRelationResolvers = {
  user: (_obj, { root }) => {
    return db.userPresence.findUnique({ where: { id: root?.id } }).user()
  },
}
