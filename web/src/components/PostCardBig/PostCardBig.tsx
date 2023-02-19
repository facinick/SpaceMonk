import './PostCardBig.css'
import { useParseHtml } from 'src/hooks/useParseHtml'
import { useAuth } from 'src/auth'
import { navigate, routes } from '@redwoodjs/router'
import { EditPostIcon } from '../Icons/icons'
import { prose_classes } from '../Editor/TipTapEditor'
import { POST_BY_ID } from 'types/graphql'
import { VotingComponent } from '../VotingComponent/VotingComponent'
import { useMemo } from 'react'
import { MyVoteValue } from '../Business/businessLogic'
import { useMutation } from '@redwoodjs/web'
import { DOWNVOTE_MUTATION, UPVOTE_MUTATION } from 'src/graphql/mutations'
import { POST_BY_ID_QUERY } from 'src/graphql/queries'
import DeletePostButton from '../DeletePostButton/DeletePostButton'
interface ComponentProps {
  post: POST_BY_ID['post']
}

const PostCardBig = (props: ComponentProps) => {
  const { post } = props
  const { id, title, body, headerImageUrl, createdAt, author, score, votes } =
    post
  const { username, id: authodId } = author
  const totalVotesSum = score

  const currentUserOrFalse = useAuth().currentUser
    ? useAuth().currentUser
    : false

  const [upvote, { loading: loading_upvote, data: data_upvote }] = useMutation(
    UPVOTE_MUTATION,
    {
      refetchQueries: [POST_BY_ID_QUERY],
    }
  )

  const [downvote, { loading: loading_downvote, data: data_downvote }] =
    useMutation(DOWNVOTE_MUTATION, {
      refetchQueries: [POST_BY_ID_QUERY],
    })

  // const isAdmin = hasRole(['admin'])
  const isCreator =
    currentUserOrFalse !== false && currentUserOrFalse.id === authodId
  const isAuthorizedToModify = isCreator
  const isAuthorizedToDelete = isCreator

  const myVote = useMemo(() => {
    if (currentUserOrFalse === false) {
      return []
    }
    return votes.filter((vote) => vote.user.id === currentUserOrFalse.id)
  }, [votes, currentUserOrFalse])

  const myVoteValue = (myVote.length === 1 ? myVote[0].value : 0) as MyVoteValue
  const parsedBodyHtml = useParseHtml(body)
  const readableTime = new Date(createdAt).toDateString()

  const openUpdatePostEditor = () => {
    navigate(routes.editPost({ id }))
  }

  const onUpvote = async () => {
    await upvote({
      variables: {
        input: {
          entityType: 'POST',
          postId: id,
          commentId: null,
        },
      },
    })
  }

  const onDownVote = async () => {
    await downvote({
      variables: {
        input: {
          entityType: 'POST',
          postId: id,
          commentId: null,
        },
      },
    })
  }

  return (
    <div
      className={`${prose_classes} border-current-color w-full max-w-2xl rounded-lg border p-5`}
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
        <VotingComponent
          disable={currentUserOrFalse === false}
          myVoteValue={myVoteValue}
          totalVotesSum={totalVotesSum}
          onUpvote={onUpvote}
          onDownvote={onDownVote}
        />
        {/* Admin Section */}
        <div className="flex gap-2">
          {isAuthorizedToModify && (
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
