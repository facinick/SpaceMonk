import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { hasRole, requireAuth } from 'src/lib/auth'
import { ROLE } from 'src/functions/auth'

export const users: QueryResolvers['users'] = () => {
  requireAuth({ roles: ROLE.ADMIN })
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  requireAuth({ roles: ROLE.ADMIN })
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  requireAuth({ roles: ROLE.ADMIN })
  return db.user.update({
    data: input,
    where: { id },
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
    return db.user.findUnique({ where: { id: root?.id } }).userRoles()
  },
}
