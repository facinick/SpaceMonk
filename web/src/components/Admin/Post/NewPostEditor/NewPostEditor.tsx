import { useMemo, useRef, useState } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { RTEditor } from 'src/components/Editor/RTEditor'
import { isImageValid } from 'src/hooks/useImageValidator'
import { useNewPostStore } from 'src/store/zustand/newPostStore'
import { CreatePostMutation } from 'types/graphql'

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
    }
  }
`
export function NewPostEditor() {
  const [createPost, { loading }] = useMutation<CreatePostMutation>(CREATE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post created')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { title, body, headerImageUrl, setTitle, setBody, setHeaderImageUrl } = useNewPostStore()
  const editorRef = useRef(null)
  const initialBodyValue = useMemo(() => {
    return body
  }, [])

  const [_validatingHeaderImageUrl, setValidatingHeaderImageUrl] =
    useState<boolean>(false)

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const title = event.target.value
    setTitle(title)
  }

  const onBodyChange = (newValue: string) => {
    setBody(newValue)
  }

  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const _title = title.trim()
    const _body = body.trim()
    const _headerImageUrl = headerImageUrl.trim()

    if (_title === '') {
      toast.error(`Title cannot be empty`)
      return
    }

    if (_body === '') {
      toast.error(`Post content cannot be empty`)
      return
    }

    if (_headerImageUrl !== '') {
      await setValidatingHeaderImageUrl((_state) => true)
      const isValid = await isImageValid(headerImageUrl)
      if (!isValid) {
        toast.error(`Header image URL is not okay`)
        return
      }
      await setValidatingHeaderImageUrl((_state) => false)
    }

    await createPost({
      variables: {
        input: {
          title: _title,
          body: _body,
          ...(_headerImageUrl && { headerImageUrl: _headerImageUrl })
        }
      },
    })
  }

  const onClearInputs = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setTitle("")
    setBody("")
    setHeaderImageUrl("")
  }

  const disableInputs = loading

  return (
    <>
      <div className='flex flex-col gap-5'>
      <div className="form-control w-full">
          <input disabled={disableInputs} required onChange={onTitleChange} value={title} type="text" placeholder="Title: Make every letter count" className="input input-bordered w-full" />
      </div>

      <RTEditor
        onEditorChange={onBodyChange}
        disable={disableInputs}
        ref={editorRef}
        initialValue={initialBodyValue}
        value={body}
      />
      <div className='flex flex-row gap-5 ml-auto'>
        <button className="btn-secondary btn" onClick={onClearInputs}>
          clear
        </button>
        <button className="btn-primary btn" disabled={disableInputs} onClick={onSubmit}>
          submit
        </button>
        </div>
      </div>
    </>
  )
}
