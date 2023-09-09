import type {
  MutationResolvers,
  QueryResolvers,
  UserRelationResolvers,
  UsersSortOrder,
} from 'types/graphql';

import { ROLE } from 'src/functions/auth';
import { requireAuth, requireOwnerAccess } from 'src/lib/auth';
import { db } from 'src/lib/db';

export const users: QueryResolvers['users'] = async ({ query }) => {
  const { first, after, orderBy } = query || {};
  let cursorWhere = undefined;

  // Handle pagination using the "after" cursor
  if (after) {
    cursorWhere = { id: parseInt(after, 10) };
  }

  // Build the "where" object for filtering by username
  const where = query?.filter
    ? {
        OR: [
          { username: { contains: query.filter } },
        ],
      }
    : {};

  // Fetch users with pagination, filtering, and ordering
  const users = await db.user.findMany({
    where,
    skip: cursorWhere ? 1 : undefined, // Skip the first item when using "after"
    take: first,
    cursor: cursorWhere ? { id: cursorWhere.id } : undefined, // Use the cursor for pagination
    orderBy: orderBy
      ? {
        ...(orderBy.username && {
          username: orderBy.username === "desc" ? 'desc' : 'asc' as UsersSortOrder,
        }),
      }
      : undefined,
    include: {
      profile: true,
    },
  });

  // Calculate cursors for pageInfo
  const startCursor = users.length > 0 ? users[0].id.toString() : null;
  const endCursor =
    users.length > 0 ? users[users.length - 1].id.toString() : null;

  return {
    edges: users.map((user) => ({
      cursor: user.id.toString(),
      node: user,
    })),
    pageInfo: {
      hasNextPage: users.length === first, // If there are more items to paginate
      hasPreviousPage: !!after, // If there are previous items
      startCursor,
      endCursor,
    },
  };
};

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const me: QueryResolvers['user'] = async () => {
  requireAuth()
  const userId = context.currentUser.id
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      userRoles: true,
      votes: true,
      comments: true,
      posts: true,
      followers: true,
      following: true,
      UserPresence: true,
      profile: true,
    },
  })
  return user
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  const roles: Array<String> = input.userRoles

  if (roles.length === 0) {
    roles.push(ROLE.MEMBER)
  }

  return db.user.create({
    data: {
      ...input,
      userRoles: {
        create: input.userRoles.map((role) => ({ name: role })),
      },
    },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  requireAuth([ROLE.ADMIN])
  return db.user.delete({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  userRoles: (_obj, { root }) => {
    requireOwnerAccess({ id: root.id })
    return db.userRole.findMany({ where: { userId: root.id } })
  },
  posts: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root.id } }).posts()
  },
  votes: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root.id } }).votes()
  },
  comments: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root.id } }).comments()
  },
  profile: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root.id } }).profile()
  },
  UserPresence: (_obj, { root }) => {
    requireAuth(["admin"])
    return db.user.findUnique({ where: { id: root.id } }).UserPresence()
  },
  followers: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root.id } }).followers()
  },
  following: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root.id } }).following()
  },
}
