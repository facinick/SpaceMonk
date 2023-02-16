import "./PostCardBig.css"
import { useParseHtml } from "src/hooks/useParseHtml";
import { useAuth } from "src/auth";
import { navigate, routes } from "@redwoodjs/router";
interface ComponentProps {
  headerImageUrl?: string
  title: string
  body: string
  id: number
  createdAt: string
}

const dropCapCss = ``

const PostCardBig = (props: ComponentProps) => {

  const { headerImageUrl, title, body, id, createdAt } = props

  const { hasRole } = useAuth()

  const isAdmin = hasRole(['admin'])

  const parsedBodyHtml = useParseHtml(body) // react element

  const openUpdatePostEditor = () => {
    navigate(routes.editPost({ id }))
  }

  return (
    <div className="w-full max-w-2xl border rounded-lg p-5 border-current-color">
      <div className="relative inline-block w-full">
        <img className="w-full h-[300px] object-cover rounded-t-lg" src={headerImageUrl} alt="post header image" />
        <div className="px-8 bg-[#0000004d] absolute left-0 top-0 w-[100%] h-[100%] flex items-center justify-center">
          <h1 style={{ overflowWrap: "anywhere" }} className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
        </div>
      </div>
      <div className="p-5 prose">
        <div className="mb-3" style={{ overflowWrap: "anywhere" }}>{parsedBodyHtml}</div>
        <div className="flex justify-between items-center flex-row">
          <time dateTime={createdAt}>{new Date(createdAt).toDateString()}</time>
          {isAdmin && <button title="Edit this post" className="btn btn-sm btn-primary" onClick={openUpdatePostEditor}>Edit</button>}
        </div>
      </div>
    </div>
  )
}

export default PostCardBig
