import type {
  QueryResolvers,
  MutationResolvers,
  UserProfileRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { ServerError } from 'src/error/ServerError'

export const userProfiles: QueryResolvers['userProfiles'] = () => {
  return db.userProfile.findMany()
}

export const userProfile: QueryResolvers['userProfile'] = ({ id }) => {
  return db.userProfile.findUnique({
    where: { id },
  })
}

export const userProfileByUsername: QueryResolvers['userProfile'] = async ({
  username,
}) => {
  const user = await db.user.findUnique({ where: { username } })

  if (!user) {
    throw new ServerError({
      message: `User @${username} doesn't exist, how about that?`,
    })
  }

  const profile = await db.userProfile.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
    },
  })

  return profile
}

export const createUserProfile: MutationResolvers['createUserProfile'] = ({
  input,
}) => {
  return db.userProfile.create({
    data: input,
  })
}

export const updateUserProfile: MutationResolvers['updateUserProfile'] = ({
  id,
  input,
}) => {
  return db.userProfile.update({
    data: input,
    where: { id },
  })
}

export const deleteUserProfile: MutationResolvers['deleteUserProfile'] = ({
  id,
}) => {
  return db.userProfile.delete({
    where: { id },
  })
}

export const UserProfile: UserProfileRelationResolvers = {
  User: (_obj, { root }) => {
    return db.userProfile.findUnique({ where: { id: root?.id } }).User()
  },
}
