import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { BackIcon } from 'src/features/Icons/icons'
//@ts-ignore
import UpdatePostCell from 'src/features/post/UpdatePostCell/UpdatePostCell'

interface PageProps {
  id: number
}

const PostPage = (props: PageProps) => {
  const { id } = props

  return (
    <>
      <MetaTags title="Post" description="Edit Post page" />
      <div className="flex flex-col gap-3">
        {/* BACK BUTTON */}
        <div className={`w-full rounded-lg`}>
          <button
            title="Go Back"
            onClick={() => navigate(routes.post({ id }))}
            className="btn-sm btn gap-2"
          >
            <BackIcon />
            Back
          </button>
        </div>
        {/* POST EDITOR*/}
        <UpdatePostCell id={id} />
      </div>
    </>
  )
}

export default PostPage
