import { useMutation } from '@redwoodjs/web'
import { TrashIcon } from 'src/features/Icons/icons'
import { DELETE_COMMENT_MUTATION } from 'src/graphql/mutations'
import { COMMENTS_BY_POST_ID_QUERY } from 'src/graphql/queries'
import { wait } from 'src/utils/misc'
import { deleteComment } from 'types/graphql'

interface ComponentProps {
  commentId: number
}

const DeleteCommentButton = (props: ComponentProps) => {
  const { commentId } = props

  const [deleteComment, { loading }] = useMutation<deleteComment>(
    DELETE_COMMENT_MUTATION,
    {
      refetchQueries: [COMMENTS_BY_POST_ID_QUERY],
    }
  )

  const initiateCommentDelete = async () => {
    await deleteComment({
      variables: {
        id: commentId,
      },
    })

    wait({ seconds: 0.5 })
    alert('Comment deleted b0ss, hope nobody saw that 🤞')
  }

  const disableInput = loading

  return (
    <button
      disabled={disableInput}
      title="Delete this comment"
      className={`btn btn-error btn-sm scale-50 gap-2 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 ${
        disableInput ? 'disabled' : ''
      }`}
      onClick={initiateCommentDelete}
    >
      {<TrashIcon />}
    </button>
  )
}

export default DeleteCommentButton
