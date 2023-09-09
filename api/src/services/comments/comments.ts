import { requireAuth, requireCommentOwner } from 'src/lib/auth';
import { db } from 'src/lib/db';
import type {
  CommentResolvers,
  CommentsSortOrder,
  MutationResolvers,
  QueryResolvers
} from 'types/graphql';

export const comments: QueryResolvers['comments'] = async ({ query }) => {
  const { first, after, orderBy } = query || {};
  let cursorWhere = undefined;

  // Handle pagination using the "after" cursor
  if (after) {
    cursorWhere = { id: parseInt(after, 10) };
  }

  // Build the "where" object for filtering by username
  const where = query?.filter
    ? {
        OR: [
          { body: { contains: query.filter } },
        ],
      }
    : {};

  // Fetch users with pagination, filtering, and ordering
  const users = await db.comment.findMany({
    where,
    skip: cursorWhere ? 1 : undefined, // Skip the first item when using "after"
    take: first,
    cursor: cursorWhere ? { id: cursorWhere.id } : undefined, // Use the cursor for pagination
    orderBy: orderBy
      ? {
        ...(orderBy.createdAt && {
          createdAt: orderBy.createdAt === "desc" ? 'desc' : 'asc' as CommentsSortOrder,
        }),
      }
      : undefined,
    include: {
      author: true,
      votes: true,
    },
  });

  // Calculate cursors for pageInfo
  const startCursor = users.length > 0 ? users[0].id.toString() : null;
  const endCursor =
    users.length > 0 ? users[users.length - 1].id.toString() : null;

  return {
    edges: users.map((user) => ({
      cursor: user.id.toString(),
      node: user,
    })),
    pageInfo: {
      hasNextPage: users.length === first, // If there are more items to paginate
      hasPreviousPage: !!after, // If there are previous items
      startCursor,
      endCursor,
    },
  };
}

export const commentsByPostId: QueryResolvers['comments'] = async ({ query, postId }) => {
  const { first, after, orderBy } = query || {};
  let cursorWhere = undefined;

  // Handle pagination using the "after" cursor
  if (after) {
    cursorWhere = { id: parseInt(after, 10) };
  }

  // Build the "where" object for filtering by username
  const where = query?.filter
    ? {
        OR: [
          { body: { contains: query.filter } },
        ],
        postId
      }
    : {};

  // Fetch users with pagination, filtering, and ordering
  const users = await db.comment.findMany({
    where,
    skip: cursorWhere ? 1 : undefined, // Skip the first item when using "after"
    take: first,
    cursor: cursorWhere ? { id: cursorWhere.id } : undefined, // Use the cursor for pagination
    orderBy: orderBy
      ? {
        ...(orderBy.createdAt && {
          createdAt: orderBy.createdAt === "desc" ? 'desc' : 'asc' as CommentsSortOrder,
        }),
      }
      : undefined,
    include: {
      author: true,
      votes: true,
    },
  });

  // Calculate cursors for pageInfo
  const startCursor = users.length > 0 ? users[0].id.toString() : null;
  const endCursor =
    users.length > 0 ? users[users.length - 1].id.toString() : null;

  return {
    edges: users.map((user) => ({
      cursor: user.id.toString(),
      node: user,
    })),
    pageInfo: {
      hasNextPage: users.length === first, // If there are more items to paginate
      hasPreviousPage: !!after, // If there are previous items
      startCursor,
      endCursor,
    },
  };
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
  requireAuth()
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

  const comment = await db.comment.delete({
    where: { id },
  })

  return comment
}

export const Comment: Partial<CommentResolvers> = {
  activity: async (_obj, { root }) =>
    db.comment.count({ where: { parentCommentId: root.id } }),
  votes: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.id } }).votes(),
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
  author: (_obj, { root }) => {
    return db.comment
      .findUnique({
        where: {
          id: root.id,
        },
      })
      .author()
  },
}
