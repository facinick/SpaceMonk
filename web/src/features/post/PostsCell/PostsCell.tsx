import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { CellEmpty } from 'src/features/redwood/CellWrapper/Empty'
import { CellError } from 'src/features/redwood/CellWrapper/Error'
import { CellLoading } from 'src/features/redwood/CellWrapper/Loading'
import { ALL_POSTS_QUERY } from 'src/graphql/queries'
import { truncate } from 'src/utils/string'
import { ALL_POSTS } from 'types/graphql'
import nyam from "../../../assets/nyam.gif"
import PostCard from '../PostCard/PostCard'

export const QUERY = ALL_POSTS_QUERY

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'cache-first',
  }
}

export const Loading = () => <CellLoading />

export const isEmpty = ({ posts }) => {
  if (posts.posts.length === 0) {
    return true
  } else return false
}

export const Empty = () => <CellEmpty itemName={'Posts'}></CellEmpty>

export const Failure = ({ error }: CellFailureProps) => (
  <CellError message={error.message}></CellError>
)

export const Success = ({ posts }: CellSuccessProps<ALL_POSTS>) => {
  return (
    <ul className="flex flex-col gap-8">
      {posts.posts.map((post) => {
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
              headerImageUrl={
                post.headerImageUrl || nyam
              }
              id={post.id}
            />
          </li>
        )
      })}
    </ul>
  )
}