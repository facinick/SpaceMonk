import { MetaTags } from '@redwoodjs/web'
import PostsCell from 'src/features/post/PostsCell'
const BlogPage = () => {
  return (
    <>
      <MetaTags title="Blog" description="Blog page" />
      <PostsCell />
    </>
  )
}

export default BlogPage
