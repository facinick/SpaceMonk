import type {
  MutationResolvers,
  PostResolvers,
  PostsSortOrder,
  QueryResolvers
} from 'types/graphql';

import { requireAuth, requirePostOwner } from 'src/lib/auth';
import { db } from 'src/lib/db';
import randomImageQueue from 'src/queues/randomImageQueue';

export const posts: QueryResolvers['posts'] = async ({ query }) => {
  try {
    // Initialize default values for optional inputs
    const { filter = '', first, after, orderBy } = query || {};

    // Build the Prisma query based on the input parameters
    const postsQuery = {
      where: {
        // Customize this to apply your filter logic based on the 'filter' input
        OR: [
          { title: { contains: filter } },
          { body: { contains: filter } },
        ],
      },
      orderBy: orderBy
        ? {
            ...(orderBy.createdAt && {
              createdAt: orderBy.createdAt === "desc" ? 'desc' : 'asc' as PostsSortOrder,
            }),
            ...(orderBy.activity && {
              activity: orderBy.activity === "desc" ? 'desc' : 'asc' as PostsSortOrder,
            }),
            ...(orderBy.score && {
              score: orderBy.score === "desc" ? 'desc' : 'asc' as PostsSortOrder,
            }),
          }
        : undefined,
    };

    // Fetch posts from the database using Prisma
    const allPosts = await db.post.findMany(postsQuery);

    // Apply cursor-based pagination
    const startIdx = after ? allPosts.findIndex((post) => post.id === parseInt(after)) + 1 : 0;
    let endIdx = startIdx + (first || allPosts.length);

    if (endIdx > allPosts.length) {
      endIdx = allPosts.length;
    }

    const posts = allPosts.slice(startIdx, endIdx);

    // Calculate pageInfo
    const hasNextPage = endIdx < allPosts.length;
    const hasPreviousPage = startIdx > 0;
    const startCursor = posts.length > 0 ? posts[0].id.toString() : null;
    const endCursor =
      posts.length > 0 ? posts[posts.length - 1].id.toString() : null;

    return {
      edges: posts.map((post) => ({
        cursor: post.id.toString(),
        node: post,
      })),
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
    };
  } catch (error) {
    // Handle any errors that occur during execution
    console.error('Error in posts resolver:', error);

    // You can throw a custom error if needed
    throw new Error('An error occurred while fetching posts.');
  }
};

export const postsByUsername: QueryResolvers['postsByUsername'] = async ({ query, username }) => {
  try {
    // Initialize default values for optional inputs
    const { filter = '', first, after, orderBy } = query || {};

    // Build the Prisma query based on the input parameters
    const postsQuery = {
      where: {
        // Customize this to apply your filter logic based on the 'filter' input
        OR: [
          { title: { contains: filter } },
          { body: { contains: filter } },
        ],
        username
      },
      orderBy: orderBy
        ? {
            ...(orderBy.createdAt && {
              createdAt: orderBy.createdAt === "desc" ? 'desc' : 'asc' as PostsSortOrder,
            }),
            ...(orderBy.activity && {
              activity: orderBy.activity === "desc" ? 'desc' : 'asc' as PostsSortOrder,
            }),
            ...(orderBy.score && {
              score: orderBy.score === "desc" ? 'desc' : 'asc' as PostsSortOrder,
            }),
          }
        : undefined,
    };

    // Fetch posts from the database using Prisma
    const allPosts = await db.post.findMany(postsQuery);

    // Apply cursor-based pagination
    const startIdx = after ? allPosts.findIndex((post) => post.id === parseInt(after)) + 1 : 0;
    let endIdx = startIdx + (first || allPosts.length);

    if (endIdx > allPosts.length) {
      endIdx = allPosts.length;
    }

    const posts = allPosts.slice(startIdx, endIdx);

    // Calculate pageInfo
    const hasNextPage = endIdx < allPosts.length;
    const hasPreviousPage = startIdx > 0;
    const startCursor = posts.length > 0 ? posts[0].id.toString() : null;
    const endCursor =
      posts.length > 0 ? posts[posts.length - 1].id.toString() : null;

    return {
      edges: posts.map((post) => ({
        cursor: post.id.toString(),
        node: post,
      })),
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
    };
  } catch (error) {
    // Handle any errors that occur during execution
    console.error('Error in posts resolver:', error);

    // You can throw a custom error if needed
    throw new Error('An error occurred while fetching posts.');
  }
};

export const post: QueryResolvers['post'] = async ({ id }) => {
  const post = await db.post.findUnique({
    where: { id },
  })
  return post
}

export const createPost: MutationResolvers['createPost'] = async ({ input }) => {
  requireAuth()
  const authorId = context.currentUser.id

  const { tags } = input

  const tagsToConnect = tags.filter((tag) => tag.id !== -1).map( ({id, ...rest})  => { return { id } })
  const tagsToCreate = tags.filter((tag) => tag.id === -1).map((value, index, array) => ({name: value.name}))

  // time to do some background task ba
  const post = await db.post.create({
    data: {
      authorId,
      ...input,
      tags: {
        connect: [
          ...tagsToConnect
        ],
        create: [
          ...tagsToCreate
        ]
      }
    },
    include: {
      tags: true
    }
  })

  if(!input.headerImageUrl) {
    const _job = await randomImageQueue.add({}, { delay: 2000 }); // Delayed by 2 seconds for good measure
    // Listen to the completed event to update the post when the job finishes
    randomImageQueue.on('completed', async (job, result) => {
      if (_job.id === job.id) { // Check if the job is the one we added
        // Update the post with the random image URL
        await db.post.update({
          where: { id: post.id }, // You need to have an 'id' in your input
          data: { headerImageUrl: result.imageUrl },
        });
      }
    });
  }

  return post
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
    where: {
      id,
    },
    include: {
      author: true,
      votes: true,
    },
  })
}

export const Post: Partial<PostResolvers> = {
  author: (_obj, { root }) =>
    db.post.findUnique({ where: { id: root.id } }).author(),
  activity: async (_obj, { root }) =>
    db.comment.count({ where: { postId: root.id } }),
  comments: (_obj, { root }) => {
    return db.post.findUnique({ where: { id: root.id } }).comments()
  },
  votes: (_obj, { root }) =>
    db.post.findUnique({ where: { id: root.id } }).votes(),
  tags: (_obj, { root }) =>
    db.post.findUnique({ where: { id: root.id } }).tags(),
}
