import { Link, routes } from '@redwoodjs/router'
import { CellSuccessProps } from '@redwoodjs/web'
import { Chip } from 'src/ui/chip/Chip'
import { ALL_POSTS } from 'types/graphql'

interface ComponentProps {
  headerImageUrl?: string
  title: string
  body: string
  bodyPlainText: string
  id: number
  truncated: boolean
  createdAt: string
  authorUsername: string
  tags: CellSuccessProps<ALL_POSTS>['posts']['posts'][0]['tags']
}

const PostCard = (props: ComponentProps) => {
  const {
    headerImageUrl,
    title,
    body,
    authorUsername,
    id,
    createdAt,
    truncated,
    bodyPlainText,
    tags
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
        <div className={`card-body w-[100%]`}>
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
          <time className="brightness-75" dateTime={createdAt}>
            {new Date(createdAt).toDateString()}
          </time>
          <address className="author">By @{authorUsername}</address>
          <div className="flex flex-wrap gap-y-2">
            {tags.map((tag => <Chip key={tag.id}>{tag.name}</Chip>))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
