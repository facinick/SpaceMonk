import { useLocation } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { CREATE_COMMENT_MUTATION } from 'src/graphql/mutations'
import { COMMENTS_BY_POST_ID_QUERY } from 'src/graphql/queries'
import { prose_classes } from '../Editor/TipTapEditor'
import { toast } from '@redwoodjs/web/toast'
import { useNewCommentStore } from 'src/store/zustand/newCommentStore'
import { ChatBubbleIcon } from '../Icons/icons'
import { useAuthentication } from 'src/hooks/useAuthentication'
import { wait } from 'src/utils/misc'
import { createComment } from 'types/graphql'
import { isBetween } from 'src/utils/validations'

type ComponentProps = {}

function NewCommentEditor(props: ComponentProps) {
  // this component will only load on posts page, so this must always be valid
  const { pathname } = useLocation()
  const postId = parseInt(pathname.split('/post/')[1])
  const { data, setBody, clearBodyPostI } = useNewCommentStore()
  const currentUserOrFalse = useAuthentication({})
  const [disable, setDisable] = useState<boolean>(false)
  const body = data[postId]

  // to initialise body to "" in the Record<postId, body>
  // otherwise when you press submit, a call of trim() on undefined
  // will throw an error
  useEffect(() => {
    setBody(postId, '')
  }, [])

  const [createComment, { loading: loading_upvote, data: data_upvote }] =
    useMutation<createComment>(CREATE_COMMENT_MUTATION, {
      refetchQueries: [COMMENTS_BY_POST_ID_QUERY],
      onCompleted: () => {
        toast.success('Comment added')
        clearBodyPostI(postId)
        wait({ seconds: 0.5 })
      },
      onError: (error) => {
        console.log(error.graphQLErrors)
        toast.error(`${error.name}: ${error.message}`)
      },
    })
  const disableInputs = disable || loading_upvote

  useEffect(() => {
    if (currentUserOrFalse !== false) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [currentUserOrFalse])

  const submit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()

    const _body = body.trim()

    if (_body === '') {
      toast.error(`Comment cannot be empty, dumbass!`)
      return
    }

    if (
      !isBetween({
        value: _body.length,
        lower: 10,
        upper: 200,
      })
    ) {
      toast.error(`Comment must be within 10 to 200 chars long :/`)
      return
    }

    await createComment({
      variables: {
        input: {
          body: _body,
          postId,
        },
      },
    })
  }

  const onBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    const body = event.target.value
    setBody(postId, body)
  }

  return (
    <>
      <div
        className={`${prose_classes} border-current-color w-full max-w-2xl rounded-lg p-5`}
      >
        <form className="form-control">
          <label className="label">
            <span className="label-text">commenT</span>
            <span className="label-text-alt">Ɔoɯɯǝuʇ</span>
          </label>
          <textarea
            className={`textarea-bordered textarea h-24`}
            disabled={disableInputs}
            value={body}
            required
            minLength={10}
            maxLength={200}
            onChange={onBodyChange}
            placeholder="Say something worth saying (in 10-200 letters)"
          ></textarea>
          <label className="label">
            <span className="label-text-alt">ʇuǝɯɯoƆ</span>
            <span className="label-text-alt">tnemmoC</span>
          </label>
          <div className="mt-8" />
          <button
            disabled={disableInputs}
            onClick={submit}
            className={`btn-primary btn-sm btn gap-2 ${
              disableInputs ? 'disabled' : ''
            }`}
          >
            Comment
            <ChatBubbleIcon />
          </button>
        </form>
      </div>
    </>
  )
}

export { NewCommentEditor }
