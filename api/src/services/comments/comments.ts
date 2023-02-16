import { requireAuth, requireCommentOwner } from 'src/lib/auth'
import { db } from 'src/lib/db'
import type {
  CommentResolvers,
  CommentsByPostIdInput,
  MutationResolvers,
  QueryResolvers,
} from 'types/graphql'

export const comments: QueryResolvers['comments'] = () => {
  return db.comment.findMany()
}

export const commentsByPostId: QueryResolvers['comments'] = async ({ input }: { input: CommentsByPostIdInput }) => {
  const post =  await db.post.findUnique({
    where: {
      id: input.postId
    },
    include: {
      comments: true
    }
  })

  return post.comments
}

export const comment: QueryResolvers['comment'] = ({ id }) => {
  return db.comment.findUnique({
    where: { id },
  })
}

export const createComment: MutationResolvers['createComment'] = async ({
  input,
}) => {
  requireAuth({})
  const authorId = context.currentUser.id
  const comment = await db.comment.create({
    data: {
      authorId,
      ...input
    }
  })
  return comment
}

export const updateComment: MutationResolvers['updateComment'] = async ({
  id,
  input,
}) => {
  await requireCommentOwner({ id })
  return db.comment.update({
    data: input,
    where: { id },
  })
}

export const incrementScore = async ({ id, value }) => {
  return db.comment.update({
    where: { id },
    data: { score: { increment: value } },
  })
}

export const decrementScore = async ({ id, value }) => {
  return db.comment.update({
    where: { id },
    data: { score: { decrement: value } },
  })
}

export const deleteComment: MutationResolvers['deleteComment'] = async ({
  id,
}) => {
  await requireCommentOwner({ id })
  return db.comment.delete({
    where: { id },
  })
}

export const Comment: CommentResolvers = {
  activity: async (_obj, { root }) =>
    db.comment.count({ where: { parentCommentId: root.id } }),
  votes: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.id } }).votes(),
  author: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.id } }).author(),
  post: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.id } }).post(),
  parent: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.parentCommentId } }),
  comments: (_obj, { root }) => {
    return db.comment.findUnique({ where: { id: root.id } }).comments({
      where: {
        parentCommentId: _obj.input?.ignoreChildComments ? null : undefined
      }
    })
  },
}
