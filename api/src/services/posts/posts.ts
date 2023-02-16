import type { QueryResolvers, MutationResolvers, PostResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { requireAuth, requirePostOwner } from 'src/lib/auth'

export const posts: QueryResolvers['posts'] = () => {
  return db.post.findMany()
}

export const post: QueryResolvers['post'] = ({ id }) => {
  return db.post.findUnique({
    where: { id },
  })
}

export const createPost: MutationResolvers['createPost'] = ({ input }) => {
  requireAuth()
  const authorId = context.currentUser.id
  return db.post.create({
    data: {
      authorId,
      ...input
    }
  })
}

export const updatePost: MutationResolvers['updatePost'] = ({ id, input }) => {
  requirePostOwner({ id })
  return db.post.update({
    data: input,
    where: { id },
  })
}

export const deletePost: MutationResolvers['deletePost'] = ({ id }) => {
  requirePostOwner({ id })
  return db.post.delete({
    where: { id },
  })
}

export const Post: PostResolvers = {
  author: (_obj, { root }) =>
    db.post.findUnique({ where: { id: root.id } }).author(),
  activity: async (_obj, { root }) =>
    db.comment.count({ where: { postId: root.id } }),
  comments: (_obj, { root }) => {
    return db.post.findUnique({ where: { id: root.id } }).comments()
  },
  votes: (_obj, { root }) =>
    db.post.findUnique({ where: { id: root.id } }).votes(),
}
