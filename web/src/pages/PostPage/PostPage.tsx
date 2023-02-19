import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { BackIcon } from 'src/components/Icons/icons'
import PostCell from 'src/components/PostCell'
import PostCardBigCommentSectionCell from 'src/components/PostCardBigCommentSectionCell'
import { NewCommentEditor } from 'src/components/NewCommentEditor/NewCommentEditor'

interface PageProps {
  id: number
}

const PostPage = (props: PageProps) => {
  const { id } = props

  return (
    <>
      <MetaTags title="Post" description="Post page" />
      <div className="flex w-full flex-col items-center gap-8">
        <button
          title="Go Back"
          onClick={() => navigate(routes.blog())}
          className="btn btn-secondary btn-sm gap-2"
        >
          <BackIcon />
          Back
        </button>
        {/* public */}
        <PostCell id={id} />
        {/* private */}
        <NewCommentEditor />
        {/* public */}
        <PostCardBigCommentSectionCell input={{ postId: id }} />
      </div>
    </>
  )
}

export default PostPage
