import "./PostCardBig.css"
import { useParseHtml } from "src/hooks/useParseHtml";
import { useAuth } from "src/auth";
import { navigate, routes, useMatch } from "@redwoodjs/router";
import { EditPostIcon } from "../Icons/icons";
import { prose_classes } from "../Editor/TipTapEditor";
import { POST_BY_ID } from "types/graphql";
import { VotingComponent } from "../VotingComponent/VotingComponent";
import { useMemo } from "react";
import { MyVoteValue } from "../Business/businessLogic";
import { useMutation } from "@redwoodjs/web";
import { DOWNVOTE_MUTATION, UPVOTE_MUTATION } from "src/graphql/mutations";
import { POST_BY_ID_QUERY } from "src/graphql/queries";
import { toast } from "@redwoodjs/web/dist/toast";
interface ComponentProps {
  post: POST_BY_ID['post']
}

const PostCardBig = (props: ComponentProps) => {

  const { isAuthenticated, currentUser, hasRole } = useAuth()
  const isReallyAuthenticated = isAuthenticated && !isNaN(currentUser?.id)

  const [upvote, { loading: loading_upvote, data: data_upvote }] = useMutation(UPVOTE_MUTATION, {
    refetchQueries: [POST_BY_ID_QUERY]
  })

  const [downvote, { loading: loading_downvote, data: data_downvote }] = useMutation(DOWNVOTE_MUTATION, {
    refetchQueries: [POST_BY_ID_QUERY]
  })

  const isAdmin = hasRole(['admin'])
  const myId = currentUser?.id

  const { post } = props
  const { id, title, body, headerImageUrl, createdAt, author, score, votes } = post
  const { username } = author
  const totalVotesSum = score

  const myVote = useMemo(() => {
    return votes.filter((vote => vote.user.id === myId))
  }, [votes, myId])

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
      }
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
      }
    })
  }

  return (
    <div className={`${prose_classes} w-full max-w-2xl border rounded-lg p-5 border-current-color`}>

      {/* Header */}
      <div className="relative inline-block w-full">
        <img className="w-full h-[300px] object-cover rounded-t-lg" src={headerImageUrl} alt="post header image" />
        <div className="px-8 bg-[#0000004d] absolute left-0 top-0 w-[100%] h-[100%] flex items-center justify-center">
          <h1 style={{ overflowWrap: "anywhere" }} className="text-4xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
        </div>
      </div>

      {/* Author */}
      <address className="author">By <a rel="author" href="#">@{username}</a></address>on <time className="inline" title={readableTime} dateTime={createdAt}>{readableTime}</time>

      {/* Article */}
      <article className="mb-3" style={{ overflowWrap: "anywhere" }}>{parsedBodyHtml}</article>

      {/* Footer */}
      <div className="flex justify-between items-center flex-row">
        <VotingComponent disable={!isReallyAuthenticated} myVoteValue={myVoteValue} totalVotesSum={totalVotesSum} onUpvote={onUpvote} onDownvote={onDownVote} />
        {/* Admin Section */}
        {isAdmin && <button title="Edit this post" className="btn btn-sm btn-primary gap-2" onClick={openUpdatePostEditor}>Edit {<EditPostIcon />}</button>}
      </div>
    </div>
  )
}

export default PostCardBig
