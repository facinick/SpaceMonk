import { Link, routes } from '@redwoodjs/router'
import { useMemo } from 'react'
import { useParseHtml } from 'src/hooks/useParseHtml'
import { prose_classes } from '../Editor/TipTapEditor'

interface ComponentProps {
  headerImageUrl?: string
  title: string
  body: string
  bodyPlainText: string
  id: number
  truncated: boolean
  createdAt: string
}

const PostCard = (props: ComponentProps) => {
  const {
    headerImageUrl,
    title,
    body,
    id,
    createdAt,
    truncated,
    bodyPlainText,
  } = props

  return (
    <Link className="w-full" to={routes.post({ id })}>
      <div className="card bg-base-200 transition-colors sm:card-side hover:bg-base-100">
        <figure className="w-[100%] sm:w-[30%]">
          <img
            className="h-[100%] w-full rounded object-cover"
            src={headerImageUrl}
            alt=""
          />
        </figure>
        <div className={`card-body w-[100%] ${prose_classes}`}>
          <h5
            style={{
              overflowWrap: 'anywhere',
              textShadow: '1px 4px 10px rgb(0 0 0 / 40%)',
            }}
            className="card-title"
          >
            {title}
          </h5>
          <div style={{ overflowWrap: 'anywhere' }}>
            {bodyPlainText}
            {truncated && <span> ... read more</span>}
          </div>
          <time
            className="text-gray-700 dark:text-gray-400"
            dateTime={createdAt}
          >
            {new Date(createdAt).toDateString()}
          </time>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
