import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { validate } from '@redwoodjs/api'
import { ROLE } from 'src/functions/auth'
import { requireAuth } from 'src/lib/auth'

export const contacts: QueryResolvers['contacts'] = () => {
  requireAuth([ROLE.ADMIN])
  return db.contact.findMany()
}

// export const contact: QueryResolvers['contact'] = ({ id }) => {
//   return db.contact.findUnique({
//     where: { id },
//   })
// }

export const createContact: MutationResolvers['createContact'] = ({
  input,
}) => {
  validate(input.phone, 'phone', {
    format: /^[6-9]\d{9}$/,
    length: { equal: 10 },
  })

  validate(input.message, 'message', {
    length: { max: 200 },
  })

  return db.contact.create({
    data: input,
  })
}

// export const updateContact: MutationResolvers['updateContact'] = ({
//   id,
//   input,
// }) => {
//   return db.contact.update({
//     data: input,
//     where: { id },
//   })
// }

// export const deleteContact: MutationResolvers['deleteContact'] = ({ id }) => {
//   return db.contact.delete({
//     where: { id },
//   })
// }
