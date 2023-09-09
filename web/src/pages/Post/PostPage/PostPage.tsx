import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { BackIcon } from 'src/features/Icons/icons'
import CommentSectionCell from 'src/features/comment/CommentSectionCell'
import { NewCommentEditor } from 'src/features/comment/NewCommentEditor/NewCommentEditor'
import PostCell from 'src/features/post/PostCell'

interface PageProps {
  id: number
}

const PostPage = (props: PageProps) => {
  const { id } = props

  return (
    <>
      <MetaTags title="Post" description="Post page" />
      <div className="flex flex-col items-center gap-3">
        {/* BACK BUTTON */}
        <div className={`w-full rounded-lg`}>
          <button
            title="Go Back"
            onClick={() => navigate(routes.blog())}
            className="btn-secondary btn-sm btn gap-2"
          >
            <BackIcon />
            Back
          </button>
        </div>
        {/* POST VIEWER */}
        <PostCell id={id} />
        {/* COMMENT FORM */}
        <NewCommentEditor />
        {/* COMMENTS SECTION */}
        <CommentSectionCell postId={id} />
      </div>
    </>
  )
}

export default PostPage
