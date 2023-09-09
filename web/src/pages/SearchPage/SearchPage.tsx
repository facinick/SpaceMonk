import { MetaTags } from '@redwoodjs/web'
import SearchCell from "src/features/search/SearchCell"

const SearchPage = () => {
  return (
    <>
      <MetaTags title="Search" description="Search page" />
      {/* <CommandMenu /> */}
      <SearchCell query={{filter: ""}}></SearchCell>
    </>
  )
}

export default SearchPage
