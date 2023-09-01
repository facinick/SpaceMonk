import UserPostsCell from "./UserPostsCell"

interface Props {
    username: string
}

const PostsComponent = ({username}: Props) => {

    console.log(`gonna load posts for this guy: ${username} `)
    return (
        <UserPostsCell username={username}></UserPostsCell>
    )
}

export default PostsComponent