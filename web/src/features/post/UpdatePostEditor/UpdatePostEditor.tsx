import { useEffect, useMemo, useRef, useState } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { CancelIcon, EditPostIcon } from 'src/features/Icons/icons'
import { TipTapEditor } from 'src/features/editor/TIpTapEditor'
import { UPDATE_POST_MUTATION } from 'src/graphql/mutations'
import { ALL_POSTS_QUERY } from 'src/graphql/queries'
import { useBreakpoint } from 'src/hooks/useBreakpoint'
import { isImageValid } from 'src/hooks/useImageValidator'
import { useUpdatePostStore } from 'src/store/zustand/updatePostStore'
import { wait } from 'src/utils/misc'
import { ALL_POSTS, POST_BY_ID, updatePost } from 'types/graphql'

interface ComponentProps {
  post: POST_BY_ID['post']
}

export function UpdatePostEditor({ post }: ComponentProps) {
  const editorRef = useRef(null)
  const {
    title,
    body,
    headerImageUrl,
    bodyPlainText,
    setTitle,
    setBody,
    setHeaderImageUrl,
    setBodyPlainText,
    reset,
  } = useUpdatePostStore()

  let definedServerHeaderImageUrl = post.headerImageUrl
    ? post.headerImageUrl
    : ''
  let definedClientHeaderImageUrl = headerImageUrl ? headerImageUrl : ''

  const { id } = post
  const [updatePost, { loading }] = useMutation<updatePost>(
    UPDATE_POST_MUTATION,
    {
      onCompleted: (data) => {
        toast.success('Post updated')
        reset()
        wait({ seconds: 0.5 })
        navigate(routes.post({ id: data.updatePost.id }))
      },
      onError: (error) => {
        console.log(error)
        toast.error(error.message)
      },
      // refetchQueries: [ALL_POSTS_QUERY],
      update: (cache, { data }) => {
        const updatedPost = data.updatePost
        const allPostsQueryResult = cache.readQuery<ALL_POSTS>({
          query: ALL_POSTS_QUERY,
        })

        let allPosts = [...allPostsQueryResult.posts.posts]
        // it has to exist, so im assuming this won't be -1
        const postToUpdateIndex = allPosts.findIndex(
          (post) => post.id === updatedPost.id
        )

        allPosts[postToUpdateIndex] = updatedPost

        cache.writeQuery({
          query: ALL_POSTS_QUERY,
          data: {
            posts: {
              posts: [...allPosts],
            },
          },
        })
      },
    }
  )

  useEffect(() => {
    setTitle(post.title)
    setBody(post.body)
    setHeaderImageUrl(definedServerHeaderImageUrl)
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

  const onBodyChange = ({
    newHtmlValue,
    newPlainTextValue,
  }: {
    newHtmlValue: string
    newPlainTextValue: string
  }) => {
    setBody(newHtmlValue)
    setBodyPlainText(newPlainTextValue)
  }

  const onHeaderImageUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault()
    const headerImageUrl = event.target.value
    setHeaderImageUrl(headerImageUrl)
  }

  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const _title = title.trim()
    const _body = body.trim()
    const _headerImageUrl = definedClientHeaderImageUrl.trim()

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
          ...(_headerImageUrl && { headerImageUrl: _headerImageUrl }),
        },
      },
    })
  }

  const cancel = () => {
    const confirmation: string | null = prompt('press F to cancel')
    if (confirmation === 'F') {
      navigate(routes.post({ id }))
    }
  }

  const disableInputs = loading && _validatingHeaderImageUrl

  const isEdited =
    post.body !== body ||
    post.title != title ||
    definedServerHeaderImageUrl !== definedClientHeaderImageUrl

  const { isMin } = useBreakpoint()

  const renderText = isMin('sm')

  return (
    <>
      <div
        className={`flex w-full flex-col items-center gap-5 rounded-lg border border-base-200 p-5`}
      >
        {/* TITLE EDIT */}
        <div className="form-control w-full">
          <input
            disabled={disableInputs}
            required
            onChange={onTitleChange}
            value={title}
            type="text"
            placeholder="Title: Make every letter count"
            className="input-bordered input w-full"
          />
        </div>

        {/* HEADER IMAGE URL EDIT */}
        <div className="form-control w-full">
          <input
            disabled={disableInputs}
            onChange={onHeaderImageUrlChange}
            value={definedClientHeaderImageUrl}
            type="text"
            placeholder="Image url"
            className="input-bordered input w-full"
          />
        </div>

        {/* BODY EDIT */}
        <TipTapEditor
          onEditorChange={onBodyChange}
          disable={disableInputs}
          ref={editorRef}
          initialValue={initialBodyValue}
          value={body}
        />

        {/* BOTTON ACTIONS: CANCEL AND EDIT */}
        <div className="flex w-full justify-between gap-2">
          <button
            className="btn-secondary btn-sm btn gap-2"
            disabled={disableInputs}
            onClick={cancel}
          >
            {renderText && 'Cancel'}
            <CancelIcon />
          </button>
          {isEdited && (
            <button
              className="btn-primary btn-sm btn gap-2"
              disabled={disableInputs}
              onClick={onSubmit}
            >
              {renderText && <>{disableInputs ? 'Updating' : 'Update'}</>}

              <EditPostIcon />
            </button>
          )}
        </div>
      </div>
    </>
  )
}
