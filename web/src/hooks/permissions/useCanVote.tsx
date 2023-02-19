import { useAuth } from 'src/auth'
import { Post } from 'types/graphql'

export type CurrentUser = ReturnType<typeof useAuth>['currentUser']

interface HookProps {}

export function useCanDeletePost(props: HookProps): boolean {
  const currentUserOrFalse = useAuth().currentUser
    ? useAuth().currentUser
    : false

  const isAuthenticatedToDelete = currentUserOrFalse

  if (!isAuthenticatedToDelete) {
    return false
  }

  return true
}
