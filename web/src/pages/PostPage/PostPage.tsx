import { back, Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
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
      <button title="Go Back" onClick={back} className="btn btn-sm btn-secondary">
        <svg aria-hidden="true" className="rotate-180 w-4 h-4 -ml-1 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        Back
      </button>
      <PostCell id={id}></PostCell>
    </div>
    </>
  )
}

export default PostPage
