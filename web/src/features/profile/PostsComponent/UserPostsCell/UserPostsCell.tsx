import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import PostCard from 'src/features/post/PostCard/PostCard'
import { CellEmpty } from 'src/features/redwood/CellWrapper/Empty'
import { CellError } from 'src/features/redwood/CellWrapper/Error'
import { CellLoading } from 'src/features/redwood/CellWrapper/Loading'
import { ALL_POSTS_BY_USERNAME_QUERY } from 'src/graphql/queries'
import { truncate } from 'src/utils/string'
import { ALL_POSTS_BY_USERNAME } from 'types/graphql'


export const QUERY = ALL_POSTS_BY_USERNAME_QUERY

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'cache-first',
  }
}

export const Loading = () => <CellLoading />

export const isEmpty = ({ postsByUsername }) => {
  if (postsByUsername.posts.length === 0) {
    return true
  } else return false
}

export const Empty = () => <CellEmpty itemName={'Posts'}></CellEmpty>

export const Failure = ({ error }: CellFailureProps) => (
  <CellError message={error.message}></CellError>
)

export const Success = ({ postsByUsername }: CellSuccessProps<ALL_POSTS_BY_USERNAME>) => {

  return (
    <ul className="flex flex-col gap-8">
      {postsByUsername.posts.map((post) => {
        const [bodyPlainText, truncated] = truncate(post.bodyPlainText, 150)
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
              headerImageUrl={post.headerImageUrl}
              id={post.id} 
              tags={post.tags}            
            />
          </li>
        )
      })}
  </ul>
  )
}
