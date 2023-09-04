import { useMutation } from '@redwoodjs/web'
import { useCallback, useEffect } from 'react'
import { UPDATE_USER_PRESENCE_MUTATION } from 'src/graphql/mutations'
import {
  ALL_POSTS_QUERY,
  MY_DATA_QUERY,
  MY_FOLLOWING_QUERY,
} from 'src/graphql/queries'
import { CurrentUser, useAuthentication } from 'src/hooks/useAuthentication'
import { useLazyQueryModded } from 'src/hooks/useLazyQuery'
import { useThemeStore } from 'src/store/zustand/themeStore'
import { debounce } from 'src/utils/misc'

type ComponentProps = {
  children?: React.ReactElement
}

export function Initialize({ children }: ComponentProps) {
  const [getMyData, { data: data_my_data }] = useLazyQueryModded(MY_DATA_QUERY)
  const [getAllPosts, { data: data_all_posts }] =
    useLazyQueryModded(ALL_POSTS_QUERY)
  const [getAllFollowing, { data: data_all_following }] =
    useLazyQueryModded(MY_FOLLOWING_QUERY)

  const [updatePresence] = useMutation(UPDATE_USER_PRESENCE_MUTATION)
  const { switchToPreferredDarkTheme, switchToPreferredLightTheme, theme } =
    useThemeStore()

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        event.matches
          ? switchToPreferredDarkTheme()
          : switchToPreferredLightTheme()
      })

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', (event) => {
          event.matches
            ? switchToPreferredDarkTheme()
            : switchToPreferredLightTheme()
        })
    }
  }, [])

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme)
  }, [theme])

  const runOnMouseMove = useCallback(
    debounce(async () => {
      await updatePresence()
    }, 5000),
    []
  )

  useAuthentication({
    onLogin: async function (currentUser: CurrentUser) {
      console.log(`logged in`)
      await getMyData()
      await getAllPosts()
      document.addEventListener('mousemove', runOnMouseMove)
    },
    onLogout: async function () {
      console.log(`logged out`)
      document.removeEventListener('mousemove', runOnMouseMove)
    },
  })

  return <>{children}</>
}
