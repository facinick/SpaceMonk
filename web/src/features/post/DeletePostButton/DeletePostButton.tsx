import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { DELETE_POST_MUTATION } from 'src/graphql/mutations'
import { ALL_POSTS_QUERY } from 'src/graphql/queries'
import { useBreakpoint } from 'src/hooks/useBreakpoint'
import { wait } from 'src/utils/misc'
import { ALL_POSTS, deletePost } from 'types/graphql'
import { TrashIcon } from '../../Icons/icons'

interface ComponentProps {
  postId: number
}

const DeletePostButton = (props: ComponentProps) => {
  const { postId } = props

  const [deletePost, { loading }] = useMutation<deletePost>(
    DELETE_POST_MUTATION,
    {
      // refetchQueries: [ALL_POSTS_QUERY],
      update: (cache, { data }) => {
        const deletedPost = data.deletePost
        const allPostsQueryResult = cache.readQuery<ALL_POSTS>({
          query: ALL_POSTS_QUERY,
        })

        let allPosts = allPostsQueryResult.posts.posts

        // it has to exist, so im assuming this won't be -1
        const postToDeleteIndex = allPosts.findIndex(
          (post) => post.id === deletedPost.id
        )

        allPosts = [
          ...allPosts.slice(0, postToDeleteIndex),
          ...allPosts.slice(postToDeleteIndex + 1),
        ]

        cache.writeQuery({
          query: ALL_POSTS_QUERY,
          data: {
            posts: {
              posts: [...allPosts],
            },
          },
        })
      },
    }
  )

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

  const { isMin } = useBreakpoint()

  const renderText = isMin('sm')

  return (
    <button
      disabled={disableInput}
      title="Delete this post"
      className={`btn-error btn-sm btn gap-2 ${disableInput ? 'disabled' : ''}`}
      onClick={initiatePostDelete}
    >
      {renderText && deletingButtonText}
      <TrashIcon />
    </button>
  )
}

export default DeletePostButton
