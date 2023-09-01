import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useMemo, useRef, useState } from 'react'
import { PlusIcon, TrashIcon } from 'src/features/Icons/icons'
import { TipTapEditor } from 'src/features/editor/TIpTapEditor'
import { CREATE_POST_MUTATION } from 'src/graphql/mutations'
import { ALL_POSTS_QUERY } from 'src/graphql/queries'
import { useBreakpoint } from 'src/hooks/useBreakpoint'
import { isImageValid } from 'src/hooks/useImageValidator'
import { useNewPostStore } from 'src/store/zustand/newPostStore'
import { wait } from 'src/utils/misc'
import { ALL_POSTS, createPost } from 'types/graphql'

export function NewPostEditor() {
  const {
    title,
    body,
    headerImageUrl,
    setBodyPlainText,
    setTitle,
    setBody,
    bodyPlainText,
    setHeaderImageUrl,
    reset,
  } = useNewPostStore()

  const [createPost, { loading }] = useMutation<createPost>(
    CREATE_POST_MUTATION,
    {
      onCompleted: (data) => {
        toast.success('Post created')
        reset()
        wait({ seconds: 0.5 })
        navigate(routes.post({ id: data.createPost.id }))
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // refetchQueries: [ALL_POSTS_QUERY],
      update: (cache, { data }) => {
        const newPost = data.createPost
        const allPosts = cache.readQuery<ALL_POSTS>({
          query: ALL_POSTS_QUERY,
        })
        cache.writeQuery({
          query: ALL_POSTS_QUERY,
          data: {
            posts: {
              posts: [newPost, ...allPosts.posts.posts],
            },
          },
        })
      },
    }
  )

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
        await setValidatingHeaderImageUrl((_state) => false)
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
          bodyPlainText: bodyPlainText.trim(),
          ...(_headerImageUrl && { headerImageUrl: _headerImageUrl }),
        },
      },
    })
  }

  const loadRandomHeaderImage = async () => {}

  const onClearInputs = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    reset()
  }

  const disableInputs = loading || _validatingHeaderImageUrl

  const { isMin } = useBreakpoint()

  const renderText = isMin('sm')

  return (
    <>
      <div
        className={`flex w-full flex-col items-center gap-5 rounded-lg border border-base-200 p-5`}
      >
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

        <div className="form-control w-full">
          <input
            disabled={disableInputs}
            onChange={onHeaderImageUrlChange}
            value={headerImageUrl}
            type="text"
            placeholder="Image url (You add it, or I'll add it for you)"
            className="input-bordered input w-full"
          />
        </div>

        <TipTapEditor
          onEditorChange={onBodyChange}
          disable={disableInputs}
          ref={editorRef}
          initialValue={initialBodyValue}
          value={body}
        />
        <div className="ml-auto flex flex-row gap-5">
          <button
            className="btn-secondary btn-sm btn gap-2"
            disabled={disableInputs}
            onClick={onClearInputs}
          >
            {renderText && 'clear'}
            <TrashIcon />
          </button>
          <button
            className="btn-primary btn-sm btn gap-2"
            disabled={disableInputs}
            onClick={onSubmit}
          >
            {renderText && <>{disableInputs ? 'Creating' : 'Create'}</>}
            <PlusIcon />
          </button>
        </div>
      </div>
    </>
  )
}
