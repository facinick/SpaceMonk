import { useState } from 'react'
import { useAuthentication } from 'src/hooks/useAuthentication'
import type {
  COMMENTS_BY_POST_ID,
  COMMENTS_BY_POST_IDVariables,
  Vote,
} from 'types/graphql'
import DeleteCommentButton from '../DeleteCommentButton/DeleteCommentButton'
import { prose_classes } from '../Editor/TipTapEditor'
import { VotingComponentVerticle } from '../VotingComponent/VotingComponentVerticle'

interface ComponentProps {
  comments: COMMENTS_BY_POST_ID['commentsByPostId']
  postId: COMMENTS_BY_POST_ID['commentsByPostId']['0']['id']
}
const PostCardBigCommentSection = ({ comments, postId }: ComponentProps) => {
  const currentUserOrFalse = useAuthentication({})

  return (
    <div
      className={`${prose_classes} border-current-color w-full max-w-2xl rounded-lg border p-5`}
    >
      <ul className="flex flex-col gap-5 !p-0">
        {comments.map((comment, index) => {
          const { body, author, votes, score, createdAt, id } = comment
          const { username, id: authorId } = author

          const readableTime = new Date(createdAt).toDateString()

          const isAuthenticatedToVote = currentUserOrFalse
          const isAuthorizedToVote = currentUserOrFalse
          const canVote = isAuthenticatedToVote && isAuthorizedToVote

          const isAuthenticatedToDelete = currentUserOrFalse
          const isAuthorizedToDelete =
            currentUserOrFalse !== false && currentUserOrFalse.id === authorId
          const canDelete = isAuthenticatedToDelete && isAuthorizedToDelete

          const isEven = index % 2 === 0

          return (
            <li
              key={index}
              className={`flex ${
                isEven ? 'flex-row' : 'flex-row-reverse'
              } !m-0 min-h-[160px] items-stretch gap-5 !py-5 !px-0`}
            >
              <aside className="!my-0 flex h-fit flex-shrink-0 items-center justify-center px-4 py-5">
                <VotingComponentVerticle
                  votes={votes}
                  score={score}
                  commentId={id}
                  postId={postId}
                  disable={canVote === false}
                />
              </aside>
              <article className="group !my-0 flex w-full flex-col justify-between self-stretch rounded-2xl bg-base-100 px-4 py-5">
                {body}
                <div className="flex flex-row justify-between">
                  <div className="text-gray-700 dark:text-gray-400">
                    <address className="author inline-block">
                      @
                      <a rel="author" href="#">
                        {username}
                      </a>
                    </address>
                    <span>{' on '}</span>
                    <time
                      className="inline"
                      title={readableTime}
                      dateTime={createdAt}
                    >
                      {readableTime}
                    </time>
                  </div>
                  {canDelete && (
                    <DeleteCommentButton
                      commentId={comment.id}
                    ></DeleteCommentButton>
                  )}
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PostCardBigCommentSection
