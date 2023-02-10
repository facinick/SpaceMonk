import { Link, routes } from "@redwoodjs/router"

interface ComponentProps {
  headerImageUrl?: string
  title: string
  bodyTruncated: string
  id: number
  createdAt: string
}

const PostCard = (props: ComponentProps) => {

  const { headerImageUrl, title, bodyTruncated, id, createdAt } = props

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={routes.postdetailed({ id })} href="#">
        <img className="rounded-t-lg" src={headerImageUrl} alt="post header image" />
      </Link>
      <div className="p-5">
        <Link to={routes.postdetailed({ id })}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{bodyTruncated}</p>
        <div className="flex flex-row justify-between items-center">
        <Link to={routes.postdetailed({ id })} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          Read more
          <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </Link>
        <time className="text-gray-700 dark:text-gray-400" dateTime={createdAt}>{new Date(createdAt).toDateString()}</time>
        </div>
      </div>
    </div>
  )
}

export default PostCard
