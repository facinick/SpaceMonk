import { MetaTags } from '@redwoodjs/web'
import TagsCell from "src/features/tags/TagsCell"

const TagsPage = () => {
  return (
    <>
      <MetaTags title="Tags" description="Tags page" />
      <TagsCell/>
    </>
  )
}

export default TagsPage
