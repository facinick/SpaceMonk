import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { DELETE_POST_MUTATION } from 'src/graphql/mutations'
import { wait } from 'src/utils/typescript'
import { TrashIcon } from '../Icons/icons'

interface ComponentProps {
  postId: number
}

const DeletePostButton = (props: ComponentProps) => {
  const { postId } = props

  const [deletePost, { loading }] = useMutation(DELETE_POST_MUTATION)

  const initiatePostDelete = async () => {
    const confirmation = prompt('type F to confirm delete')
    if (confirmation === 'F') {
      await deletePost({
        variables: {
          id: postId,
        },
      })

      wait({ seconds: 0.5 })
      alert('Post deleted b0ss')

      navigate(routes.blog())
    }
  }

  const disableInput = loading
  const deletingButtonText = loading ? 'Deleting..' : 'Delete'

  return (
    <button
      disabled={disableInput}
      title="Delete this post"
      className={`btn-error btn-sm btn gap-2 ${disableInput ? 'disabled' : ''}`}
      onClick={initiatePostDelete}
    >
      {deletingButtonText} {<TrashIcon />}
    </button>
  )
}

export default DeletePostButton
