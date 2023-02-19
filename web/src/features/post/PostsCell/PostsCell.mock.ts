import { Post } from '../../../../../api/types/graphql'
import {
  singlePost,
  singlePostBig,
  singlePostBigNoGap,
} from '../PostCell/PostCell.mock'
export const multiplePosts: Array<Post> = [
  singlePostBig,
  singlePost,
  singlePostBigNoGap,
]
