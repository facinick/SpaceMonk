import { Link, routes } from "@redwoodjs/router"
import { useMemo } from "react"
import { useParseHtml } from "src/hooks/useParseHtml"
import { prose_classes } from "../Editor/TipTapEditor"

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

  const _body = useMemo(() => {

    if (truncated) {
      const pos = body.lastIndexOf('</');
      return body.substring(0, pos) + "<p> ... read more</p></" + body.substring(pos + 1)
    }

    return body

  }, [body])

  const parsedBodyHtml = useParseHtml(_body)

  return (
    <Link className="w-full" to={routes.postdetailed({ id })} >
      <div className="card sm:card-side bg-base-200 hover:bg-base-100 transition-colors">
        <figure className="w-[100%] sm:w-[30%]"><img className="h-[100%] object-cover w-full rounded" src={headerImageUrl} alt="" /></figure>
        <div className={`card-body w-[100%] ${prose_classes}`}>
          <h5 style={{ overflowWrap: "anywhere", textShadow: '1px 4px 10px rgb(0 0 0 / 40%)' }} className="card-title">{title}</h5>
          <div style={{ overflowWrap: "anywhere" }}>{parsedBodyHtml}</div>
          <time className="text-gray-700 dark:text-gray-400" dateTime={createdAt}>{new Date(createdAt).toDateString()}</time>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
