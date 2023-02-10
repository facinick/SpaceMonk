import type { FindPostQuery, FindPostQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Route } from '@redwoodjs/router'
import { back } from '@redwoodjs/router'

export const QUERY = gql`
  query FindPostQuery($id: Int!) {
    post: post(id: $id) {
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

export const Failure = ({
  error,
}: CellFailureProps<FindPostQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  post,
}: CellSuccessProps<FindPostQuery, FindPostQueryVariables>) => {
  return (
    <article className='outline p2 post-full'>
      <div className='flex flex-row gap-2'>
      <button className='w-8 outline' title='go back' onClick={back}>{"<-"}</button>
      <h3>{post.title}</h3>
      </div>
      <p>{post.body}</p>
      {post.headerImageUrl && <img className={`w-40`} src={post.headerImageUrl} alt={`Post header image`} />}
      created on <time dateTime={post.createdAt.toString()}>{new Date(post.createdAt).toDateString()}</time>
    </article>
  )
}
