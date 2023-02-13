import { Link, routes } from "@redwoodjs/router"
import { useSyntaxHighlight } from "src/hooks/useRichTextView"

interface ComponentProps {
  headerImageUrl?: string
  title: string
  body: string
  id: number
  truncated: boolean
  createdAt: string
}

const PostCard = (props: ComponentProps) => {

  const { headerImageUrl, title, body, id, createdAt, truncated } = props

  const parsedBodyHtml = useSyntaxHighlight(body)

  return (
    <Link to={routes.postdetailed({ id })} className="w-full flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img className="max-h-[240px] object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={headerImageUrl} alt="" />
      <div className="w-full flex flex-col justify-between p-4 leading-normal">
        <h5 style={{ overflowWrap: "anywhere", textShadow: '1px 4px 10px rgb(0 0 0 / 40%)' }} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        <p style={{ overflowWrap: "anywhere" }} className="mb-3 font-normal text-gray-700 dark:text-gray-400">{parsedBodyHtml}</p>
        {truncated && <p style={{ overflowWrap: "anywhere" }} className="mb-3 font-normal text-gray-700 dark:text-gray-400">... [read more]</p>}
        <time className="text-gray-700 dark:text-gray-400" dateTime={createdAt}>{new Date(createdAt).toDateString()}</time>
      </div>
    </Link>
  )
}

export default PostCard
