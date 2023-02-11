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
      <button title="Go Back" onClick={back} className="mb-8 mr-auto ml-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
        <svg aria-hidden="true" className="rotate-180 w-4 h-4 -ml-1 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        Back
      </button>
      <PostCell id={id}></PostCell>
    </>
  )
}

export default PostPage
