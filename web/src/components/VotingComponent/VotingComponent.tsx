import { useState } from 'react'
import { abbreviateNumberPlusMinus50Million } from 'src/utils/string'
import { MyVoteValue, TotalVotes } from '../Business/businessLogic'
import { UpIcon, DownIcon } from '../Icons/icons'

type ComponentProps = {
  myVoteValue: MyVoteValue
  totalVotesSum: TotalVotes
  onUpvote: () => Promise<void>
  onDownvote: () => Promise<void>
  disable: boolean
}

const VotingComponent = (props: ComponentProps) => {
  const { myVoteValue, totalVotesSum, onUpvote, onDownvote, disable } = props

  const [disabled, setDisabled] = useState<boolean>(false)

  const IUpVoted = myVoteValue === 1
  const IDownVoted = myVoteValue === -1

  const upvote = async () => {
    setDisabled(true)
    await onUpvote()
    setDisabled(false)
  }

  const downvote = async () => {
    setDisabled(true)
    await onDownvote()
    setDisabled(false)
  }

  const _disable = disable || disabled

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <button
        onClick={upvote}
        disabled={_disable}
        title="👍"
        className={`${_disable ? 'disabled' : ''} btn-sm btn ${
          IUpVoted ? 'btn-success' : 'btn-outline'
        } gap-2`}
      >
        <UpIcon />
      </button>
      <p className="!m-0 min-w-[32px] text-center text-xl">
        {abbreviateNumberPlusMinus50Million(totalVotesSum)}
      </p>
      <button
        onClick={downvote}
        disabled={_disable}
        title="👎"
        className={`${_disable ? 'disabled' : ''} btn-sm btn ${
          IDownVoted ? 'btn-error' : 'btn-outline'
        } gap-2`}
      >
        <DownIcon />
      </button>
    </div>
  )
}

export { VotingComponent }
