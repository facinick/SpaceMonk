// web/src/components/TagsCell/TagsCell.js

import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@redwoodjs/web';
import { CellError } from 'src/features/redwood/CellWrapper/Error';
import { CellLoading } from 'src/features/redwood/CellWrapper/Loading';
import { ALL_POSTS_QUERY } from 'src/graphql/queries';
import { truncate } from 'src/utils/string';
import { ALL_POSTS } from 'types/graphql';
import nyam from "../../../assets/nyam.gif";
import PostCard from '../PostCard/PostCard';

const LoadMorePostsCell = ({query}) => {
    
    const { data, loading, error, fetchMore, networkStatus } = useQuery<ALL_POSTS>(ALL_POSTS_QUERY, {
        variables: { query },
    });

    const fetchingMore = networkStatus === NetworkStatus.fetchMore

    const handleLoadMore = (event) => {
        event.preventDefault();

        if (!data?.posts.pageInfo.hasNextPage || fetchingMore) {
            return;
        }

        fetchMore({
            variables: {
                query: {
                    ...query,
                    after: data.posts.pageInfo.endCursor,
                },
            },
            updateQuery: (prevResult, { fetchMoreResult }) => {

                if (!fetchMoreResult) return prevResult;

                return {
                    posts: {
                        ...fetchMoreResult.posts,
                        edges: [...prevResult.posts.edges, ...fetchMoreResult.posts.edges],
                    },
                };
            },
        });
    };

    if (loading && !data) {
        // Display main loading state only for 
        // the initial data fetch
        return <CellLoading />
    }

    if (error) {
        return <CellError message={error.message} />
    }

    const posts = data?.posts.edges.map((edge) => edge.node);

    return (
        <div>
            <ul className="flex flex-col gap-8">
                {posts.map((post) => {
                    const [bodyPlainText, truncated] = truncate(post.bodyPlainText, 150);
                    return (
                        <li className="flex items-center justify-center" key={post.id}>
                            <PostCard
                                bodyPlainText={bodyPlainText}
                                key={post.id}
                                authorUsername={post.author.username}
                                createdAt={post.createdAt}
                                truncated={truncated}
                                body={post.body}
                                title={post.title}
                                headerImageUrl={
                                    post.headerImageUrl || nyam
                                }
                                tags={post.tags}
                                id={post.id}
                            />
                        </li>
                    );
                })}
            </ul>
            {data.posts.pageInfo.hasNextPage && (
                <button className='btn btn-sm mt-8 btn-secondary' type="button" onClick={handleLoadMore}>
                    {fetchingMore ? 'Fetching...' : 'Fetch More'}
                </button>
            )}
        </div>
    );
};

export { LoadMorePostsCell };
