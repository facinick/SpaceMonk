import { MetaTags } from '@redwoodjs/web'
import { LoadMorePostsCell } from 'src/features/post/PostsCell/LoadMorePostsCell'
const BlogPage = () => {
  return (
    <>
      <MetaTags title="Blog" description="Blog page" />
      {/* ALL POSTS VIEWER */}
      <LoadMorePostsCell query={{ first: 2, orderBy: { createdAt: "desc" }, after: undefined }} />
    </>
  )
}

export default BlogPage
