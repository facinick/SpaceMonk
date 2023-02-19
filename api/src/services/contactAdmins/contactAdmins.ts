import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { validate } from '@redwoodjs/api'

export const contactAdmins: QueryResolvers['contactAdmins'] = () => {
  requireAuth({ roles: ['admin'] })
  return db.contactAdmin.findMany()
}

export const createContactAdmin: MutationResolvers['createContactAdmin'] = ({
  input,
}) => {
  validate(input.message, 'message', {
    length: { min: 10, max: 200 },
  })

  return db.contactAdmin.create({
    data: input,
  })
}

export const deleteContactAdmin: MutationResolvers['deleteContactAdmin'] = ({
  id,
}) => {
  requireAuth({ roles: ['admin'] })
  return db.contactAdmin.delete({
    where: { id },
  })
}
