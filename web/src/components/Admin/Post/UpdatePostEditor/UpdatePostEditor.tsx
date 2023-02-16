import { useEffect, useMemo, useRef, useState } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { RTEditor } from 'src/components/Editor/RTEditor'
import { isImageValid } from 'src/hooks/useImageValidator'
import { Post, UpdatePostMutation } from 'types/graphql'
import { useUpdatePostStore } from 'src/store/zustand/updatePostStore'
import { TipTapEditor } from 'src/components/Editor/TipTapEditor'
import { wait } from 'src/utils/typescript'

const UPDATE_POST_MUTATION = gql`
  mutation UpdatePostMutation($id: Int!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
      headerImageUrl
      createdAt
      updatedAt
    }
  }
`

interface ComponentProps {
  id: number
  post: Post
}

export function UpdatePostEditor({ id, post }: ComponentProps) {

  const editorRef = useRef(null)
  const { title, body, headerImageUrl, setTitle, setBody, setHeaderImageUrl, reset, setBodyPlainText, bodyPlainText } = useUpdatePostStore()

  const [updatePost, { loading }] = useMutation<UpdatePostMutation>(UPDATE_POST_MUTATION, {
    onCompleted: (data) => {
      toast.success('Post updated')
      reset()
      wait({ seconds: 0.5 })
      navigate(routes.postdetailed({ id: data.updatePost.id }))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    setTitle(post.title)
    setBody(post.body)
    setHeaderImageUrl(post.headerImageUrl || "")
  }, [post])


  const initialBodyValue = useMemo(() => {
    return post.body
  }, [post])

  const [_validatingHeaderImageUrl, setValidatingHeaderImageUrl] =
    useState<boolean>(false)

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const title = event.target.value
    setTitle(title)
  }

  const onBodyChange = ({ newHtmlValue, newPlainTextValue }: {
    newHtmlValue: string;
    newPlainTextValue: string;
  }) => {
    setBody(newHtmlValue)
    setBodyPlainText(newPlainTextValue)
  }

  const onHeaderImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const headerImageUrl = event.target.value
    setHeaderImageUrl(headerImageUrl)
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

    await updatePost({
      variables: {
        id,
        input: {
          title: _title,
          body: _body,
          bodyPlainText: bodyPlainText.trim(),
          ...(_headerImageUrl && { headerImageUrl: _headerImageUrl })
        }
      },
    })
  }

  const disableInputs = loading && _validatingHeaderImageUrl

  const isEdited = post.body !== body

  return (
    <>
      <div className='flex flex-col gap-5 items-center w-[100%] sm:w-[80%]'>
        <div className="form-control w-full">
          <input disabled={disableInputs} required onChange={onTitleChange} value={title} type="text" placeholder="Title: Make every letter count" className="input input-bordered w-full" />
        </div>

        <div className="form-control w-full">
          <input disabled={disableInputs} onChange={onHeaderImageUrlChange} value={headerImageUrl} type="text" placeholder="Image url" className="input input-bordered w-full" />
        </div>

        <TipTapEditor
          onEditorChange={onBodyChange}
          disable={disableInputs}
          ref={editorRef}
          initialValue={initialBodyValue}
          value={body}
        />
        <div className='flex flex-row gap-5 ml-auto'>
          {isEdited && <button className="btn-primary btn" disabled={disableInputs} onClick={onSubmit}>
            {disableInputs ? "Updated" : "Update"}
          </button>}
        </div>
      </div>
    </>
  )
}
