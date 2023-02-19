import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { NewCommentEditor } from 'src/features/comment/NewCommentEditor/NewCommentEditor'
import { prose_classes } from 'src/features/editor/TIpTapEditor'
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
