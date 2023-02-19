import { back } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { BackIcon } from 'src/features/Icons/icons'
import { NewPostEditor } from 'src/features/post/NewPostEditor/NewPostEditor'

const NewPostPage = () => {
  return (
    <>
      <MetaTags title="New Post" description="Create post page" />
      <div className="flex flex-col gap-3">
        {/* BACK BUTTON */}
        <div className={`w-full rounded-lg`}>
          <button title="Go Back" onClick={back} className="btn-sm btn gap-2">
            <BackIcon />
            Back
          </button>
        </div>
        {/* POST CREATOR*/}
        <NewPostEditor />
      </div>
    </>
  )
}

export default NewPostPage
