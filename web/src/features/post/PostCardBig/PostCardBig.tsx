import { useParseHtml } from 'src/hooks/useParseHtml'
import { useAuth } from 'src/auth'
import { navigate, routes } from '@redwoodjs/router'
import { EditPostIcon } from '../../Icons/icons'
import { POST_BY_ID } from 'types/graphql'
import DeletePostButton from '../DeletePostButton/DeletePostButton'
import { PostVotingComponent } from 'src/features/vote/VotingComponent/PostVotingComponent'
interface ComponentProps {
  post: POST_BY_ID['post']
}

const PostCardBig = (props: ComponentProps) => {
  const { post } = props
  const { id, title, body, headerImageUrl, createdAt, author, score, votes } =
    post
  const { username, id: authodId } = author

  const currentUserOrFalse = useAuth().currentUser
    ? useAuth().currentUser
    : false

  const isCreator =
    currentUserOrFalse !== false && currentUserOrFalse.id === authodId
  const isAuthorizedToModify = isCreator
  const isAuthorizedToDelete = isCreator

  const parsedBodyHtml = useParseHtml(body)
  const readableTime = new Date(createdAt).toDateString()

  const openUpdatePostEditor = () => {
    navigate(routes.editPost({ id }))
  }

  return (
    <div
      className={`border-current-color w-full items-center rounded-lg border p-5`}
    >
      {/* Header */}
      <div className="relative inline-block w-full">
        <img
          className="h-[300px] w-full rounded-t-lg object-cover"
          src={headerImageUrl}
          alt="post header image"
        />
        <div className="absolute left-0 top-0 flex h-[100%] w-[100%] items-center justify-center bg-[#0000004d] px-8">
          <h1
            style={{ overflowWrap: 'anywhere' }}
            className="!m-0 text-center text-4xl font-bold !text-[#ffffffcc]"
          >
            {title}
          </h1>
        </div>
      </div>
      {/* Author */}
      <address className="author">
        By{' '}
        <a rel="author" href="#">
          @{username}
        </a>
      </address>
      on{' '}
      <time className="inline" title={readableTime} dateTime={createdAt}>
        {readableTime}
      </time>
      {/* Article */}
      <article style={{ overflowWrap: 'anywhere' }}>{parsedBodyHtml}</article>
      {/* Footer */}
      <aside className="flex flex-row items-center justify-between">
        <PostVotingComponent
          votes={votes}
          score={score}
          postId={post.id}
          disable={currentUserOrFalse === false}
        />
        {/* Admin Section */}
        <div className="flex gap-2">
          {isAuthorizedToDelete && (
            <DeletePostButton postId={post.id}></DeletePostButton>
          )}
          {isAuthorizedToModify && (
            <button
              title="Edit this post"
              className="btn-primary btn-sm btn gap-2"
              onClick={openUpdatePostEditor}
            >
              Edit {<EditPostIcon />}
            </button>
          )}
        </div>
      </aside>
    </div>
  )
}

export default PostCardBig
