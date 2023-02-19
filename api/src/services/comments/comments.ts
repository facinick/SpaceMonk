import { requireAuth, requireCommentOwner } from 'src/lib/auth'
import { db } from 'src/lib/db'
import type {
  CommentResolvers,
  CommentsByPostIdInput,
  MutationResolvers,
  QueryResolvers,
} from 'types/graphql'

export const comments: QueryResolvers['comments'] = () => {
  return db.comment.findMany({
    include: {
      author: true,
      votes: true,
    },
  })
}

export const commentsByPostId: QueryResolvers['comments'] = async ({
  input,
}: {
  input: CommentsByPostIdInput
}) => {
  const post = await db.post.findUnique({
    where: {
      id: input.postId,
    },
    include: {
      comments: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  })

  return post?.comments
}

export const comment: QueryResolvers['comment'] = ({ id }) => {
  return db.comment.findUnique({
    where: { id },
    include: {
      votes: true,
      author: true,
    },
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
      ...input,
    },
    include: {
      author: true,
      votes: true,
    },
  })
  return comment
}

export const deleteComment: MutationResolvers['deleteComment'] = async ({
  id,
}) => {
  await requireCommentOwner({ id })

  // const commentToDelete = await db.comment.findUnique({ where: { id } })
  // const votesToDelete = await db.comment.findUnique({ where: { id } }).votes()
  // const author = await db.comment.findUnique({ where: { id } }).votes()

  const comment = await db.comment.delete({
    where: { id },
    include: {
      author: true,
      votes: {
        include: {
          user: true,
        },
      },
    },
  })

  return comment
}

export const Comment: Partial<CommentResolvers> = {
  activity: async (_obj, { root }) =>
    db.comment.count({ where: { parentCommentId: root.id } }),
  // votes: (_obj, { root }) =>
  //   db.comment.findUnique({ where: { id: root.id } }).votes(),
  post: (_obj, { root }) =>
    db.comment
      .findUnique({
        where: {
          id: root.id,
        },
      })
      .post(),
  parent: async (_obj, { root }) => {
    if (root.parentCommentId === null) {
      return null
    }
    const parentComment = await db.comment.findUnique({
      where: {
        id: root.parentCommentId,
      },
      include: {
        votes: true,
        author: true,
      },
    })

    if (!parentComment) {
      return null
    }

    return parentComment
  },
  comments: (_obj, { root }) => {
    return db.comment.findMany({
      where: {
        parentCommentId: root.id,
      },
      include: {
        votes: true,
        author: true,
      },
    })
  },
  // author: (_obj, { root }) => {
  //   return db.comment.findUnique({
  //     where: {
  //       id: root.id
  //     }
  //   }).author()
  // },
}
