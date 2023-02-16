import { useMutation } from '@redwoodjs/web'
import { useMemo } from 'react'
import { useAuth } from 'src/auth'
import { DOWNVOTE_MUTATION, UPVOTE_MUTATION } from 'src/graphql/mutations'
import { COMMENTS_BY_POST_ID_QUERY } from 'src/graphql/queries'
import type { COMMENTS_BY_POST_ID, COMMENTS_BY_POST_IDVariables } from 'types/graphql'
import { MyVoteValue } from '../Business/businessLogic'
import { prose_classes } from '../Editor/TipTapEditor'
import { VotingComponentVerticle } from '../VotingComponent/VotingComponentVerticle'

interface ComponentProps {
  comments: COMMENTS_BY_POST_ID['commentsByPostId']
  postId: number
}
const PostCardBigCommentSection = ({ comments, postId }: ComponentProps) => {

  const { isAuthenticated, currentUser } = useAuth()
  const isReallyAuthenticated = isAuthenticated && !isNaN(currentUser?.id)
  const myId = currentUser?.id
  const [upvote, { loading: loading_upvote, data: data_upvote }] = useMutation(UPVOTE_MUTATION, {
    refetchQueries: [COMMENTS_BY_POST_ID_QUERY]
  })

  const [downvote, { loading: loading_downvote, data: data_downvote }] = useMutation(DOWNVOTE_MUTATION, {
    refetchQueries: [COMMENTS_BY_POST_ID_QUERY]
  })

  return (
    <div className={`${prose_classes} w-full max-w-2xl border rounded-lg p-5 border-current-color`}>
      <ul className='!p-0 gap-5 flex flex-col'>
        {comments.map((comment, index, commentsArray) => {

          const { body, id, author, votes, score, createdAt } = comment
          const { username } = author
          const totalVotesSum = score

          const myVote = useMemo(() => {
            return votes.filter((vote => vote.user.id === myId))
          }, [votes, myId])

          const myVoteValue = (myVote.length === 1 ? myVote[0].value : 0) as MyVoteValue
          const readableTime = new Date(createdAt).toDateString()

          const openEditMyComment = () => {

          }

          const onUpvote = async () => {
            await upvote({
              variables: {
                input: {
                  entityType: 'COMMENT',
                  postId,
                  commentId: id,
                },
              }
            })
          }

          const onDownVote = async () => {
            await downvote({
              variables: {
                input: {
                  entityType: 'COMMENT',
                  postId,
                  commentId: id,
                },
              }
            })
          }

          const isEven = index % 2 === 0

          return (
            <li key={index} className={`flex ${isEven ? "flex-row" : "flex-row-reverse"} !py-[20px] items-baseline !m-0 gap-5 min-h-[160px]`}>
              <div className='flex-shrink-0 min-w-[80px] flex justify-center items-center !my-0'>
                <VotingComponentVerticle
                  myVoteValue={myVoteValue}
                  totalVotesSum={totalVotesSum}
                  onUpvote={onUpvote}
                  onDownvote={onDownVote}
                  disable={!isReallyAuthenticated} />
              </div>
              <div className='w-full flex items-center !my-0 rounded-2xl bg-base-100 p-5'>{comment.body}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PostCardBigCommentSection
