import { useState } from "react"
import { abbreviateNumberPlusMinus50Million } from "src/utils/string"
import { MyVoteValue, TotalVotes } from "../Business/businessLogic"
import { UpIcon, DownIcon } from "../Icons/icons"

type ComponentProps = {
  myVoteValue: MyVoteValue
  totalVotesSum: TotalVotes
  onUpvote: () => Promise<void>
  onDownvote: () => Promise<void>
  disable: boolean
}

const VotingComponentVerticle = (props: ComponentProps) => {

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
    // <div className="flex flex-col gap-2 items-center justify-center">
    //   <button onClick={upvote} disabled={_disable} title="👍" className={`${_disable ? "disabled" : ""} btn btn-sm ${IUpVoted ? "btn-success" : "btn-outline"} gap-2`}>
    //     <UpIcon />
    //   </button>
    //   <p className="text-xl">{abbreviateNumberPlusMinus50Million(totalVotesSum)}</p>
    //   <button onClick={downvote} disabled={_disable} title="👎" className={`${_disable ? "disabled" : ""} btn btn-sm ${IDownVoted ? "btn-error" : "btn-outline"} gap-2`}>
    //     <DownIcon />
    //   </button>
    // </div>

    <div className="btn-group btn-group-vertical items-center">
      <button onClick={upvote} disabled={_disable} title="👍" className={`${_disable ? "disabled" : ""} btn btn-sm ${IUpVoted ? "btn-success" : "btn-outline"} gap-2`}>
        <UpIcon />
      </button>
      <p className="text-xl">{abbreviateNumberPlusMinus50Million(totalVotesSum)}</p>
      <button onClick={downvote} disabled={_disable} title="👎" className={`${_disable ? "disabled" : ""} btn btn-sm ${IDownVoted ? "btn-error" : "btn-outline"} gap-2`}>
        <DownIcon />
      </button>
    </div>
  )
}

export { VotingComponentVerticle }
