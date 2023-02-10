import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import PostsCell from 'src/components/PostsCell'

const BlogPage = () => {
  return (
    <>
      <MetaTags title="Blog" description="Blog page" />
      <h1>BlogPage</h1>
      <PostsCell></PostsCell>
    </>
  )
}

export default BlogPage
