import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { NewCommentEditor } from 'src/features/comment/NewCommentEditor/NewCommentEditor'
import { BackIcon } from 'src/features/Icons/icons'
import PostCell from 'src/features/post/PostCell'
import CommentSectionCell from 'src/features/comment/CommentSectionCell'

interface PageProps {
  id: number
}

const PostPage = (props: PageProps) => {
  const { id } = props

  return (
    <>
      <MetaTags title="Post" description="Post page" />
      <div className="flex flex-col gap-3">
        {/* BACK BUTTON */}
        <div className={`w-full rounded-lg`}>
          <button
            title="Go Back"
            onClick={() => navigate(routes.blog())}
            className="btn-sm btn gap-2"
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
        <CommentSectionCell input={{ postId: id }} />
      </div>
    </>
  )
}

export default PostPage
