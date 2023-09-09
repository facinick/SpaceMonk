import type {
  MutationResolvers,
  QueryResolvers,
  TagRelationResolvers,
  TagsSortOrder,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const tag: QueryResolvers['tag'] = ({ id }) => {
  return db.tag.findUnique({
    where: { id },
    include: {
      posts: true
    }
  })
}


export const tags: QueryResolvers['tags'] = async ({ query }) => {
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
          { name: { contains: query.filter } },
        ],
      }
    : {};

  // Fetch users with pagination, filtering, and ordering
  const tags = await db.tag.findMany({
    where,
    skip: cursorWhere ? 1 : undefined, // Skip the first item when using "after"
    take: first,
    cursor: cursorWhere ? { id: cursorWhere.id } : undefined, // Use the cursor for pagination
    orderBy: orderBy
      ? {
        ...(orderBy.name && {
          name: orderBy.name === "desc" ? 'desc' : 'asc' as TagsSortOrder,
        }),
        ...(orderBy.popularity && {
          popularity: orderBy.popularity === "desc" ? 'desc' : 'asc' as TagsSortOrder,
        }),
      }
      : undefined,
  });

  // Calculate cursors for pageInfo
  const startCursor = tags.length > 0 ? tags[0].id.toString() : null;
  const endCursor =
  tags.length > 0 ? tags[tags.length - 1].id.toString() : null;

  return {
    edges: tags.map((tags) => ({
      cursor: tags.id.toString(),
      node: tags,
    })),
    pageInfo: {
      hasNextPage: tags.length === first, // If there are more items to paginate
      hasPreviousPage: !!after, // If there are previous items
      startCursor,
      endCursor,
    },
  };
};


export const createTag: MutationResolvers['createTag'] = ({ input }) => {
  return db.tag.create({
    data: input,
  })
}

export const tagByName = ({ name }) => {
  return db.tag.findUnique({
    where: { name },
    include: {
      posts: true
    }
  })
}

export const deleteTag: MutationResolvers['deleteTag'] = ({ id }) => {
  return db.tag.delete({
    where: { id },
  })
}

export const Tag: TagRelationResolvers = {
  posts: (_obj, { root }) => {
    return db.tag.findUnique({ where: { id: root?.id } }).posts()
  },
}
