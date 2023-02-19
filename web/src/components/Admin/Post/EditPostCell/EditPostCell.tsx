import type { EditPostById, UpdatePostInput } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { UpdatePostEditor } from '../UpdatePostEditor/UpdatePostEditor'

export const QUERY = gql`
  query EditPostById($id: Int!) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ post }: CellSuccessProps<EditPostById>) => {
  console.log(post)

  return <UpdatePostEditor id={post.id} post={post} />
}
