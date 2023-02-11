import type { PostsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Link, NavLink, routes, useLocation } from "@redwoodjs/router"
import PostCard from '../PostCard/PostCard'
import { truncate } from 'src/utils/string'

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
      {posts.map((post) => (
        <li className="flex items-center justify-center" key={post.id}>
          <PostCard createdAt={post.createdAt} bodyTruncated={truncate(post.body, 200)} title={post.title} headerImageUrl={post.headerImageUrl} id={post.id} />
        </li>))}
    </ul>
  )
}
