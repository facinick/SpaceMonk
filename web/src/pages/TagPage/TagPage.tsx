import { MetaTags } from '@redwoodjs/web'
import PostWithTagCell from "src/features/tags/PostsWithTagCell"

interface PageProps {
  name: string
}

const TagPage = (props: PageProps) => {

  const { name } = props

  return (
    <>
      <MetaTags title={`Tag ${name}`} description={`${name} Tag Page`} />
      <h1 className='p-4 text-2xl text-center'>{`Results for #${name}`}</h1>
      <PostWithTagCell name={name}></PostWithTagCell>
    </>
  )
}

export default TagPage
