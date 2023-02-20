import type { QueryResolvers, MutationResolvers } from 'types/graphql'
import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

export const contactAdmins: QueryResolvers['contactAdmins'] = () => {
  requireAuth(['admin'])
  return db.contactAdmin.findMany({
    include: {
      user: true,
    },
  })
}

export const createContactAdmin: MutationResolvers['createContactAdmin'] = ({
  input,
}) => {
  let userId = context.currentUser?.id

  let contactAdmin

  if (!isNaN(userId)) {
    contactAdmin = db.contactAdmin.create({
      data: {
        ...input,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
  } else {
    contactAdmin = db.contactAdmin.create({
      data: input,
    })
  }

  return contactAdmin
}

export const deleteContactAdmin: MutationResolvers['deleteContactAdmin'] = ({
  id,
}) => {
  requireAuth(['admin'])
  return db.contactAdmin.delete({
    where: { id },
  })
}
