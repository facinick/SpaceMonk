import type { Decoded } from '@redwoodjs/api'
import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'
import { db } from './db'

/**
 * The session object sent in as the first argument to getCurrentUser() will
 * have a single key `id` containing the unique ID of the logged in user
 * (whatever field you set as `authFields.id` in your auth function config).
 * You'll need to update the call to `db` below if you use a different model
 * name or unique field name, for example:
 *
 *   return await db.profile.findUnique({ where: { email: session.id } })
 *                   ───┬───                       ──┬──
 *      model accessor ─┘      unique id field name ─┘
 *
 * !! BEWARE !! Anything returned from this function will be available to the
 * client--it becomes the content of `currentUser` on the web side (as well as
 * `context.currentUser` on the api side). You should carefully add additional
 * fields to the `select` object below once you've decided they are safe to be
 * seen if someone were to open the Web Inspector in their browser.
 */
export const getCurrentUser = async (session: Decoded) => {
  if (!session || typeof session.id !== 'number') {
    throw new Error('Invalid session')
  }

  const user = await db.user.findUnique({
    where: { id: session.id },
    include: {
      userRoles: true,
    },
  })

  // this is just so redwood can check for roles when we do hasRole(['admin]) in web side
  const userRoles = user.userRoles
  user['roles'] = userRoles.map((userRole) => userRole.name)

  return user
}

/**
 * The user is authenticated if there is a currentUser in the context
 *
 * @returns {boolean} - If the currentUser is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!context.currentUser
}

/**
 * When checking role membership, roles can be a single value, a list, or none.
 * You can use Prisma enums too (if you're using them for roles), just import your enum type from `@prisma/client`
 */
type AllowedRoles = String[]

/**
 * Checks if the currentUser is authenticated (and assigned one of the given roles)
 *
 * @param roles: {@link AllowedRoles} - Checks if the currentUser is assigned one of these roles
 *
 * @returns {boolean} - Returns true if the currentUser is logged in and assigned one of the given roles,
 * or when no roles are provided to check against. Otherwise returns false.
 */
export const hasRole = (allowedRoles: AllowedRoles): boolean => {
  if (!isAuthenticated()) {
    return false
  }

  const currentUserRoles = context.currentUser.userRoles.map(
    (userRole) => userRole.name
  )

  return currentUserRoles.some((currentUserRole) =>
    allowedRoles.includes(currentUserRole)
  )
}

/**
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @param roles: {@link AllowedRoles} - When checking role membership, these roles grant access.
 *
 * @returns - If the currentUser is authenticated (and assigned one of the given roles)
 *
 * @throws {@link AuthenticationError} - If the currentUser is not authenticated
 * @throws {@link ForbiddenError} If the currentUser is not allowed due to role permissions
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const requireAuth = (roles: AllowedRoles = []) => {
  if (!isAuthenticated()) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (roles.length > 0 && !hasRole(roles)) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}

export const requireOwnerAccess = ({
  id,
}: {
  id: typeof context.currentUser.id
}) => {
  requireAuth()

  if (id !== context.currentUser.id) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}

export const requireCommentOwner = async ({ id }: { id: number }) => {
  requireAuth()

  const userId: number = context.currentUser.id
  const comment = await db.comment.findUnique({
    where: {
      id,
    },
  })

  if (comment.authorId !== userId) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}

export const requirePostOwner = async ({
  id,
}: {
  id: number
}): Promise<boolean> => {
  requireAuth()

  const userId: number = context.currentUser.id
  const post = await db.post.findUnique({
    where: {
      id,
    },
  })

  if (post.authorId === userId) {
    return true
  } else {
    return false
  }
}
