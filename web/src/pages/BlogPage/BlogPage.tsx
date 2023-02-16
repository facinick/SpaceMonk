import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import PageTitle from 'src/components/PageTitle/PageTitle'
import PostsCell from 'src/components/PostsCell'

const BlogPage = () => {
  return (
    <>
      <MetaTags title="Blog" description="Blog page" />
      <div className='flex flex-col gap-8 items-center'>
        <PageTitle title='Blog Posts' />
        <PostsCell />
      </div>
    </>
  )
}

export default BlogPage
