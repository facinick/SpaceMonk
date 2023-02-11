import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import PostCell from 'src/components/PostCell'

interface PageProps {
  id: number
}

const PostPage = (props: PageProps) => {
  const {id} = props
  return (
    <>
      <MetaTags title="Post" description="Post page" />
      {/* <PageTitle title='Post Posts' /> */}
      <PostCell id={id}></PostCell>
    </>
  )
}

export default PostPage
