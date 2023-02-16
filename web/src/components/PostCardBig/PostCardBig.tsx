import "./PostCardBig.css"
import { useParseHtml } from "src/hooks/useParseHtml";
import { useAuth } from "src/auth";
import { navigate, routes } from "@redwoodjs/router";
import { EditPostIcon } from "../Icons/icons";
import { prose_classes } from "../Editor/TipTapEditor";
import { POST_BY_ID } from "types/graphql";
interface ComponentProps {
  post: POST_BY_ID['post']
}

const PostCardBig = (props: ComponentProps) => {

  const { post } = props
  const { id, title, body, headerImageUrl, createdAt, author } = post
  const { username } = author

  const { hasRole } = useAuth()

  const isAdmin = hasRole(['admin'])

  const parsedBodyHtml = useParseHtml(body)

  const openUpdatePostEditor = () => {
    navigate(routes.editPost({ id }))
  }

  const readableTime = new Date(createdAt).toDateString()

  return (
    <div className={`${prose_classes} w-full max-w-2xl border rounded-lg p-5 border-current-color`}>

      {/* Header */}
      <div className="relative inline-block w-full">
        <img className="w-full h-[300px] object-cover rounded-t-lg" src={headerImageUrl} alt="post header image" />
        <div className="px-8 bg-[#0000004d] absolute left-0 top-0 w-[100%] h-[100%] flex items-center justify-center">
          <h1 style={{ overflowWrap: "anywhere" }} className="text-4xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
        </div>
      </div>

      {/* Author */}
      <address className="author">By <a rel="author" href="#">@{username}</a></address>on <time className="inline" title={readableTime} dateTime={createdAt}>{readableTime}</time>

      {/* Article */}
      <article className="mb-3" style={{ overflowWrap: "anywhere" }}>{parsedBodyHtml}</article>

      {/* Admin Section */}
      {isAdmin &&
        <div className="flex justify-end items-center flex-row">
          <button title="Edit this post" className="btn btn-sm btn-primary gap-2" onClick={openUpdatePostEditor}>Edit {<EditPostIcon />}</button>
        </div>
      }

    </div>
  )
}

export default PostCardBig
