import { useMutation } from '@redwoodjs/web'
import { useMemo, useState } from 'react'
import { UPVOTE_MUTATION, DOWNVOTE_MUTATION } from 'src/graphql/mutations'
import { POST_BY_ID_QUERY } from 'src/graphql/queries'
import { useAuthentication } from 'src/hooks/useAuthentication'
import { abbreviateNumberPlusMinus50Million } from 'src/utils/string'
import { POST_BY_ID } from 'types/graphql'
import { MyVoteValue } from '../Business/businessLogic'
import { UpIcon, DownIcon } from '../Icons/icons'

type ComponentProps = {
  disable: boolean
  votes: POST_BY_ID['post']['votes']
  score: POST_BY_ID['post']['score']
  postId: POST_BY_ID['post']['id']
}

const VotingComponent = (props: ComponentProps) => {
  const { votes, score, postId, disable } = props

  const currentUserOrFalse = useAuthentication({})

  const [upvote] = useMutation(UPVOTE_MUTATION, {
    refetchQueries: [POST_BY_ID_QUERY],
  })

  const [downvote] = useMutation(DOWNVOTE_MUTATION, {
    refetchQueries: [POST_BY_ID_QUERY],
  })

  const myVote = useMemo(() => {
    const vote = currentUserOrFalse
      ? votes.filter(
          (vote) =>
            vote.user.id === currentUserOrFalse.id && vote.entityType === 'POST'
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
          commentId: null,
          entityType: 'POST',
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
          commentId: null,
          entityType: 'POST',
        },
      },
    })
    setDisabled(false)
  }

  const _disable = disable || disabled

  return (
    <div className="flex flex-row items-center justify-center gap-2">
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
      <p className="!m-0 min-w-[32px] text-center text-xl">
        {abbreviateNumberPlusMinus50Million(score)}
      </p>
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

export { VotingComponent }
