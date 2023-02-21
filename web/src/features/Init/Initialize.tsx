import { useEffect } from 'react'
import { MY_DATA_QUERY, ALL_POSTS_QUERY } from 'src/graphql/queries'
import { CurrentUser, useAuthentication } from 'src/hooks/useAuthentication'
import { useLazyQueryModded } from 'src/hooks/useLazyQuery'
import { useThemeStore } from 'src/store/zustand/themeStore'

type ComponentProps = {
  children?: React.ReactElement
}

export function Initialize({ children }: ComponentProps) {
  const [getMyData, { data: data_my_data }] = useLazyQueryModded(MY_DATA_QUERY)
  const [getAllPosts, { data: data_all_posts }] =
    useLazyQueryModded(ALL_POSTS_QUERY)

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

  useAuthentication({
    onLogin: async function (currentUser: CurrentUser) {
      console.log(`logged in`)
      await getMyData()
      await getAllPosts()
    },
    onLogout: () => console.log(`logged out`),
  })

  return <>{children}</>
}
