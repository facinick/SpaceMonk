import { back, Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { BackIcon, DownIcon, UpIcon } from 'src/components/Icons/icons'
import PostCell from 'src/components/PostCell'

interface PageProps {
  id: number
}

const PostPage = (props: PageProps) => {
  const { id } = props
  return (
    <>
      <MetaTags title="Post" description="Post page" />
      <div className='flex flex-col gap-8 items-center w-full'>
        <div className='flex flex-row gap-4 items-center justify-center w-full'>
          <button title="Go Back" onClick={back} className="btn btn-sm btn-secondary gap-2">
            <BackIcon />
            Back
          </button>

          <button title="Up Vote" className="btn btn-sm btn-success btn-square gap-2">
            <UpIcon />
          </button>

          <button title="Down Vote" className="btn btn-sm btn-error btn-square gap-2">
            <DownIcon />
          </button>
        </div>
        <PostCell id={id}></PostCell>
      </div>
    </>
  )
}

export default PostPage
