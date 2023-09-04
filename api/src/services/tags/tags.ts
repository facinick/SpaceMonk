import type {
  MutationResolvers,
  QueryResolvers,
  TagRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const tag: QueryResolvers['tag'] = ({ id }) => {
  return db.tag.findUnique({
    where: { id },
  })
}

export const tags: QueryResolvers['tags'] = async ({ input }) => {
  // Build the "where" object for filtering by tag name
  const where = input?.filter
    ? {
        OR: [
          { name: { contains: input?.filter } },
        ],
      }
    : {};

  // Initialize "orderBy" object for sorting by popularity
  let orderBy = {};

  // Check if "orderBy" is specified and set the sorting condition
  if (input?.orderBy) {
    if (input.orderBy.popularity === 'asc') {
      orderBy = { posts: { _count: 'asc' } };
    } else if (input.orderBy.popularity === 'desc') {
      orderBy = { posts: { _count: 'desc' } };
    }
  }

  // Use Prisma to fetch tags based on the constructed "where" object, pagination, and sorting
  const tags = await db.tag.findMany({
    where,
    skip: input?.skip,
    take: input?.take,
    orderBy
  });

  return tags || [];
};

export const createTag: MutationResolvers['createTag'] = ({ input }) => {
  return db.tag.create({
    data: input,
  })
}

export const tagByName = ({ name }) => {
  return db.tag.findUnique({
    where: { name },
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
