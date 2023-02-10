import type { PostsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Link, NavLink, routes, useLocation } from "@redwoodjs/router"

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
    <ul>
      {posts.map((post) => (<li key={post.id}>
        <article className='outline p2 post-small'>
          <h3><Link className='underline text-blue-700' to={routes.post({id: post.id})}>{post.title}</Link></h3>
          <p>{post.body}</p>
          {post.headerImageUrl && <img className={`w-40`} src={post.headerImageUrl} alt={`Post header image`} />}
          created on <time dateTime={post.createdAt.toString()}>{new Date(post.createdAt).toDateString()}</time>
        </article>
        </li>))}
    </ul>
  )
}
