import { useMutation } from '@redwoodjs/web'
import { useMemo, useState } from 'react'
import { UPVOTE_MUTATION, DOWNVOTE_MUTATION } from 'src/graphql/mutations'
import { COMMENTS_BY_POST_ID_QUERY } from 'src/graphql/queries'
import { useAuthentication } from 'src/hooks/useAuthentication'
import { abbreviateNumberPlusMinus50Million } from 'src/utils/string'
import { COMMENTS_BY_POST_ID, downvote, upvote } from 'types/graphql'
import { MyVoteValue } from '../../business/businessLogic'
import { UpIcon, DownIcon } from '../../Icons/icons'

type ComponentProps = {
  disable: boolean
  votes: COMMENTS_BY_POST_ID['commentsByPostId']['0']['votes']
  score: COMMENTS_BY_POST_ID['commentsByPostId']['0']['score']
  postId: COMMENTS_BY_POST_ID['commentsByPostId']['0']['id']
  commentId: COMMENTS_BY_POST_ID['commentsByPostId']['0']['id']
}

const CommentVotingComponent = (props: ComponentProps) => {
  const { score, disable, votes, postId, commentId } = props

  const currentUserOrFalse = useAuthentication({})

  const [upvote] = useMutation<upvote>(UPVOTE_MUTATION, {
    refetchQueries: [COMMENTS_BY_POST_ID_QUERY],
  })

  const [downvote] = useMutation<downvote>(DOWNVOTE_MUTATION, {
    refetchQueries: [COMMENTS_BY_POST_ID_QUERY],
  })

  const myVote = useMemo(() => {
    const vote = currentUserOrFalse
      ? votes.filter(
          (vote) =>
            vote.user.id === currentUserOrFalse.id &&
            vote.entityType === 'COMMENT'
        )
      : []
    return vote
  }, [currentUserOrFalse, votes])

  const myVoteValue = (myVote.length === 1 ? myVote[0].value : 0) as MyVoteValue

  const [disabled, setDisabled] = useState<boolean>(false)

  const IUpVoted = myVoteValue === 1
  const IDownVoted = myVoteValue === -1

  const onUpvote = async () => {
    setDisabled(true)
    await upvote({
      variables: {
        input: {
          postId,
          commentId,
          entityType: 'COMMENT',
        },
      },
    })
    setDisabled(false)
  }

  const onDownvote = async () => {
    setDisabled(true)
    await downvote({
      variables: {
        input: {
          postId,
          commentId,
          entityType: 'COMMENT',
        },
      },
    })
    setDisabled(false)
  }

  const _disable = disable || disabled

  return (
    <div className="btn-group btn-group-vertical items-center">
      <button
        onClick={onUpvote}
        disabled={_disable}
        title="👍"
        className={`${_disable ? 'disabled' : ''} btn btn-sm ${
          IUpVoted ? 'btn-success' : 'btn-outline'
        } gap-2`}
      >
        <UpIcon />
      </button>
      <p className="text-xl">{abbreviateNumberPlusMinus50Million(score)}</p>
      <button
        onClick={onDownvote}
        disabled={_disable}
        title="👎"
        className={`${_disable ? 'disabled' : ''} btn btn-sm ${
          IDownVoted ? 'btn-error' : 'btn-outline'
        } gap-2`}
      >
        <DownIcon />
      </button>
    </div>
  )
}

export { CommentVotingComponent }
