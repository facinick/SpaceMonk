import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { prose_classes } from 'src/features/editor/TIpTapEditor'
import { BackIcon } from 'src/features/Icons/icons'
import UpdatePostCell from 'src/features/post/UpdatePostCell/UpdatePostCell'

interface PageProps {
  id: number
}

const PostPage = (props: PageProps) => {
  const { id } = props

  return (
    <>
      <MetaTags title="Post" description="Post page" />
      <div className="flex w-full flex-col items-center gap-8">
        {/* BACK BUTTON */}
        <div className={`${prose_classes} w-full max-w-2xl rounded-lg`}>
          <button
            title="Go Back"
            onClick={() => navigate(routes.blog())}
            className="btn btn-link btn-sm gap-2"
          >
            <BackIcon />
            Back
          </button>
        </div>
        {/* POST */}
        <UpdatePostCell id={id} />
      </div>
    </>
  )
}

export default PostPage
