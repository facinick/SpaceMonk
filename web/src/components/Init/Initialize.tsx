import { useEffect } from 'react'
import { ALL_POSTS_QUERY, MY_DATA_QUERY } from 'src/graphql/queries'
import { CurrentUser, useAuthentication } from 'src/hooks/useAuthentication'
import { useLazyQueryModded } from 'src/hooks/useLazyQuery'

type ComponentProps = {
  children?: React.ReactElement
}

export function Initialize({ children }: ComponentProps) {
  const [getMyData, { data: data_my_data }] = useLazyQueryModded(MY_DATA_QUERY)
  const [getAllPosts, { data: data_all_posts }] =
    useLazyQueryModded(ALL_POSTS_QUERY)

  useAuthentication({
    onLogin: async function (currentUser: CurrentUser) {
      await getMyData()
      await getAllPosts()
    },
  })

  useEffect(() => {
    if (data_my_data && data_all_posts) {
      console.log(data_my_data)
      console.log(data_all_posts)
    }
  }, [data_my_data, data_all_posts])

  return <>{children}</>
}
