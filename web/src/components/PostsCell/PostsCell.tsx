import type { PostsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { back, Link, navigate, NavLink, routes, useLocation } from "@redwoodjs/router"
import PostCard from '../PostCard/PostCard'
import { truncate } from 'src/lib/formatters'

export const QUERY = gql`
  query PostsQuery {
    posts {
      id
      title
      body
      headerImageUrl
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ posts }: CellSuccessProps<PostsQuery>) => {

  return (
    <ul className="flex flex-col gap-8 max-w-[720px]">
      {posts.map((post) => {

        const [body, truncated] = truncate(post.body, 200)

        return (
          <li className="flex items-center justify-center" key={post.id}>
            <PostCard key={post.id} createdAt={post.createdAt} truncated={truncated} body={body} title={post.title} headerImageUrl={post.headerImageUrl || `https://loremflickr.com/1920/720`} id={post.id} />
          </li>)
      })}
    </ul>
  )
}
