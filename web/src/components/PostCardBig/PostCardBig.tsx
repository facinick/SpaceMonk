import { Link, routes } from "@redwoodjs/router"

interface ComponentProps {
  headerImageUrl?: string
  title: string
  body: string
  id: number
  createdAt: string
}

const PostCardBig = (props: ComponentProps) => {

  const { headerImageUrl, title, body, id, createdAt } = props

  return (
    <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 p-5">
      <div className="relative inline-block w-full">
        <img className="w-full h-[300px] object-cover rounded-t-lg" src={headerImageUrl} alt="post header image" />
        <div className="bg-[#0000004d] absolute left-0 top-0 w-[100%] h-[100%] flex items-center justify-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
        </div>
      </div>
      <div className="p-5">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{body}</p>
        <time className="text-gray-700 dark:text-gray-400" dateTime={createdAt}>{new Date(createdAt).toDateString()}</time>
      </div>
    </div>
  )
}

export default PostCardBig