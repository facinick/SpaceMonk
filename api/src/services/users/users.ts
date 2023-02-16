import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
  UserRole,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { requireAuth, requireOwnerAccess } from 'src/lib/auth'
import { ROLE } from 'src/functions/auth'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
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
        create: input.userRoles.map((role) => ({ name: role }))
      }
    }
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  requireAuth({ roles: ROLE.ADMIN })
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
    return db.user.findUnique({ where: { id: root.id } }).votes();
  },
  comments: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root.id } }).comments()
  },
}
