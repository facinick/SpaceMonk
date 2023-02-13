import { useMemo, useRef, useState } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { RTEditor } from 'src/components/Editor/RTEditor'
import { isImageValid } from 'src/hooks/useImageValidator'
import { useNewPostStore } from 'src/store/zustand/newPostStore'

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
    }
  }
`
export function NewPostEditor() {
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post created')
      navigate(routes.posts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { title, body, headerImageUrl, setTitle, setBody } = useNewPostStore()
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

    if (title === '') {
      toast.error(`Title cannot be empty`)
      return
    }

    if (body === '') {
      toast.error(`Post content cannot be empty`)
      return
    }

    if (headerImageUrl !== '') {
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
        title,
        body,
        headerImageUrl,
      },
    })
  }

  const disableInputs = loading

  return (
    <>
      <input
        value={title}
        onChange={onTitleChange}
        required
        type="text"
        id="newPostTitle"
      />
      <RTEditor
        onEditorChange={onBodyChange}
        disable={disableInputs}
        ref={editorRef}
        initialValue={initialBodyValue}
        value={body}
      />
      <button className="btn" disabled={disableInputs} onClick={onSubmit}>
        submit
      </button>
    </>
  )
}
