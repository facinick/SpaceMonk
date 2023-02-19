import { useAuth } from 'src/auth'
import { Comment } from 'types/graphql'

export type CurrentUser = ReturnType<typeof useAuth>['currentUser']

interface HookProps {
  comment: Comment
}

export function useCanDeleteComment(props: HookProps): boolean {
  const currentUserOrFalse = useAuth().currentUser
    ? useAuth().currentUser
    : false
  const { comment } = props

  const isAuthenticatedToDelete = currentUserOrFalse

  if (!isAuthenticatedToDelete) {
    return false
  }

  const isAuthorizedToDelete =
    currentUserOrFalse && currentUserOrFalse.id === comment.author.id

  if (!isAuthorizedToDelete) {
    return false
  }

  return true
}
