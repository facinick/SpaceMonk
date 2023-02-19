import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { BackIcon } from 'src/components/Icons/icons'
import PostCell from 'src/components/PostCell'
import PostCardBigCommentSectionCell from 'src/components/PostCardBigCommentSectionCell'
import { NewCommentEditor } from 'src/components/NewCommentEditor/NewCommentEditor'
import { prose_classes } from 'src/components/Editor/TipTapEditor'

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
            className="btn-link btn-sm btn gap-2"
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
        <PostCardBigCommentSectionCell input={{ postId: id }} />
      </div>
    </>
  )
}

export default PostPage
