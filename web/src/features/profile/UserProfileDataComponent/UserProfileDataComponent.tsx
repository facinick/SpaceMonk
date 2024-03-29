import { Suspense } from "react"
import { useProfileActiveTabStore } from 'src/store/zustand/profileActiveTabStore'

interface Props {
    username: string
}

export const UserProfileDataComponent = ({username}: Props) => {

    const { activeTab } = useProfileActiveTabStore()

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {activeTab === 0 && <Info />}
            {activeTab === 1 && <Posts username={username} />}
            {activeTab === 2 && <Circle />}
        </Suspense>
    )
}

const Info = React.lazy(() => import('../InfoComponent/InfoComponent'));
const Posts = React.lazy(() => import('../PostsComponent/PostsComponent'));
const Circle = React.lazy(() => import('../CircleComponent/CircleComponent'));
