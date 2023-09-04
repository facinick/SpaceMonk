import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import PostCard from 'src/features/post/PostCard/PostCard'
import { CellEmpty } from 'src/features/redwood/CellWrapper/Empty'
import { CellError } from 'src/features/redwood/CellWrapper/Error'
import { CellLoading } from 'src/features/redwood/CellWrapper/Loading'
import { TAG_QUERY } from 'src/graphql/queries'
import { truncate } from 'src/utils/string'
import type { TAG, TAGVariables } from 'types/graphql'

export const QUERY = TAG_QUERY

export const Loading = () => <CellLoading></CellLoading>

export const Empty = () => <CellEmpty itemName='Posts for this Tag'></CellEmpty>

export const Failure = ({
  error,
}: CellFailureProps<TAGVariables>) => <CellError message={error.message}></CellError>

export const Success = ({
  tagByName,
}: CellSuccessProps<TAG, TAGVariables>) => {
  return (
    <ul className="flex flex-col gap-8">
      {tagByName.posts.map((post) => {
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
                post.headerImageUrl
              }
              tags={post.tags}
              id={post.id}
            />
          </li>
        )
      })}
    </ul>
  )
}
