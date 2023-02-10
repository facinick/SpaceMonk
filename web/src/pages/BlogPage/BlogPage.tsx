import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const BlogPage = () => {
  return (
    <>
      <MetaTags title="Blog" description="Blog page" />

      <h1>BlogPage</h1>
      <p>
        Find me in <code>./web/src/pages/BlogPage/BlogPage.tsx</code>
      </p>
      <p>
        My default route is named <code>blog</code>, link to me with `
        <Link to={routes.blog()}>Blog</Link>`
      </p>
    </>
  )
}

export default BlogPage
