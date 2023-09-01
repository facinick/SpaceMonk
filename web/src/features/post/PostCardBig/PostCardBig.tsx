import { Link, navigate, routes } from '@redwoodjs/router'
import { useAuth } from 'src/auth'
import { PostVotingComponent } from 'src/features/vote/VotingComponent/PostVotingComponent'
import { useBreakpoint } from 'src/hooks/useBreakpoint'
import { useParseHtml } from 'src/hooks/useParseHtml'
import { POST_BY_ID } from 'types/graphql'
import nyam from "../../../assets/nyam.gif"
import { EditPostIcon } from '../../Icons/icons'
import DeletePostButton from '../DeletePostButton/DeletePostButton'
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

  const { isMin } = useBreakpoint()

  const renderText = isMin('sm')

  return (
    <div
      className={`border-current-color w-full items-center rounded-lg border p-5`}
    >
      {/* Header */}
      <div className="relative inline-block w-full">
        <img
          className="h-[300px] w-full rounded-t-lg object-cover"
          src={headerImageUrl || nyam}
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
        <Link
          rel="author"
          to={routes.profile({
            username,
          })}
        >
          @{username}
        </Link>
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
              {renderText && 'Edit'}
              {<EditPostIcon />}
            </button>
          )}
        </div>
      </aside>
    </div>
  )
}

export default PostCardBig
