import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from 'src/auth'
import { usePrevious } from './usePrevious'

export type CurrentUser = ReturnType<typeof useAuth>['currentUser']

interface HookProps {
  onLogin?: (currentUser: CurrentUser) => void
  debug?: boolean
}

export function useAuthentication({
  debug = false,
  onLogin,
}: HookProps): CurrentUser | false {
  const { isAuthenticated, currentUser } = useAuth()
  const wasAuthenticated = usePrevious(isAuthenticated)
  const [currentUserOrFalse, setCurrentUserOrFalse] = useState<
    CurrentUser | false
  >(false)

  useEffect(() => {
    if (debug) {
      console.log(
        `isAuthenticated CHANGED: ${wasAuthenticated} => ${isAuthenticated}`
      )
    }

    if (isAuthenticated) {
      setCurrentUserOrFalse(currentUser)
      if (wasAuthenticated === undefined) {
        if (debug) {
          console.log(`false login 1`)
        }
      } else if (wasAuthenticated === false) {
        if (debug) {
          console.log(`real login [MAKE API CALLS]`)
        }
        if (onLogin) {
          if (debug) {
            console.log(`1. [inside] calling onlogin`)
          }
          onLogin?.(currentUser)
          if (debug) {
            console.log(`3. [inside] called onLogin`)
          }
        }
      } else if (wasAuthenticated === true) {
        if (debug) {
          console.log(`false login 2`)
        }
      } else {
        if (debug) {
          console.log(`false login 3`)
        }
      }
    } else {
      setCurrentUserOrFalse(false)
      if (wasAuthenticated === undefined) {
        if (debug) {
          console.log(`false logout 1`)
        }
      } else if (wasAuthenticated === false) {
        if (debug) {
          console.log(`false logout 2`)
        }
      } else if (wasAuthenticated === true) {
        if (debug) {
          console.log(`real logout [MAKE API CALLS]`)
        }
      } else {
        if (debug) {
          console.log(`false logout 3`)
        }
      }
    }
  }, [isAuthenticated])

  return currentUserOrFalse
}
