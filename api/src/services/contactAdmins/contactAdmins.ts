import type { QueryResolvers, MutationResolvers } from 'types/graphql'
import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

export const contactAdmins: QueryResolvers['contactAdmins'] = () => {
  requireAuth({ roles: ['admin'] })
  return db.contactAdmin.findMany()
}

export const createContactAdmin: MutationResolvers['createContactAdmin'] = ({
  input,
}) => {
  const contactAdmin = db.contactAdmin.create({
    data: input,
  })

  return contactAdmin
}

export const deleteContactAdmin: MutationResolvers['deleteContactAdmin'] = ({
  id,
}) => {
  requireAuth({ roles: ['admin'] })
  return db.contactAdmin.delete({
    where: { id },
  })
}
