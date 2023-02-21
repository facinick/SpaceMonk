import type {
  QueryResolvers,
  MutationResolvers,
  FollowsRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

export const followers: QueryResolvers['followers'] = ({ userId }) => {
  return db.follows.findMany({
    where: {
      followingId: userId,
    },
  })
}

export const following: QueryResolvers['following'] = ({ userId }) => {
  return db.follows.findMany({
    where: {
      followerId: userId,
    },
  })
}

export const followersByUsername: QueryResolvers['followersByUsername'] =
  async ({ username }) => {
    return db.follows.findMany({
      where: {
        following: {
          username,
        },
      },
    })
  }

export const followingByUsername: QueryResolvers['followingByUsername'] =
  async ({ username }) => {
    return db.follows.findMany({
      where: {
        follower: {
          username,
        },
      },
    })
  }

export const follow: MutationResolvers['follow'] = ({ userId }) => {
  requireAuth()
  const followerId = context.currentUser.id
  return db.follows.create({
    data: {
      followerId,
      followingId: userId,
    },
  })
}

export const unfollow: MutationResolvers['unfollow'] = ({ userId }) => {
  requireAuth()

  const followerId = context.currentUser.id

  return db.follows.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId: userId,
      },
    },
  })
}

export const Follows: FollowsRelationResolvers = {
  follower: (_obj, { root }) => {
    return db.follows.findUnique({ where: { id: root.id } }).follower()
  },
  following: (_obj, { root }) => {
    return db.follows.findUnique({ where: { id: root.id } }).following()
  },
}
