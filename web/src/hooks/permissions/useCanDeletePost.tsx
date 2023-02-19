import { useAuth } from 'src/auth'
import { Post } from 'types/graphql'

export type CurrentUser = ReturnType<typeof useAuth>['currentUser']

interface HookProps {
  post: Post
}

export function useCanDeletePost(props: HookProps): boolean {
  const currentUserOrFalse = useAuth().currentUser
    ? useAuth().currentUser
    : false
  const { post } = props

  const isAuthenticatedToDelete = currentUserOrFalse

  if (!isAuthenticatedToDelete) {
    return false
  }

  const isAuthorizedToDelete =
    currentUserOrFalse && currentUserOrFalse.id === post.author.id

  if (!isAuthorizedToDelete) {
    return false
  }

  return true
}
