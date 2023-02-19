import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import PostCard from '../PostCard/PostCard'
import { ALL_POSTS_QUERY } from 'src/graphql/queries'
import { ALL_POSTS } from 'types/graphql'
import { truncate } from 'src/utils/string'

export const QUERY = ALL_POSTS_QUERY

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'cache-first',
  }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No Posts.. Such Empty!</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ posts }: CellSuccessProps<ALL_POSTS>) => {
  return (
    <ul className="flex flex-col gap-8">
      {posts.map((post) => {
        const [bodyPlainText, truncated] = truncate(post.bodyPlainText, 150)
        return (
          <li className="flex items-center justify-center" key={post.id}>
            <PostCard
              bodyPlainText={bodyPlainText}
              key={post.id}
              createdAt={post.createdAt}
              truncated={truncated}
              body={post.body}
              title={post.title}
              headerImageUrl={
                post.headerImageUrl || `https://loremflickr.com/1920/720`
              }
              id={post.id}
            />
          </li>
        )
      })}
    </ul>
  )
}
