import { useEffect } from "react"
import { useAuth } from "src/auth"
import { useLazyQuery } from '@apollo/client'
import { ALL_POSTS_QUERY, MY_DATA_QUERY } from "src/graphql/queries"

type ComponentProps = {
  children?: React.ReactElement
}

export function Initialize({ children }: ComponentProps) {

  const { isAuthenticated, currentUser } = useAuth()

  const [getMyData, { loading: loading_MyData, data: data_MyData }] = useLazyQuery(MY_DATA_QUERY)
  const [getAllPosts, { loading: loading_AllPosts , data: data_AllPosts }] = useLazyQuery(ALL_POSTS_QUERY)

  useEffect(() => {
    if (currentUser?.id && isAuthenticated) {
      getMyData()
      getAllPosts()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) {
      console.log(`clean up apollo cache, redux, browser storages, etc.`)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (data_MyData && data_AllPosts) {
      console.log(data_MyData)
      console.log(data_AllPosts)
    }
  }, [data_MyData, data_AllPosts])

  return (
    <>
    {children}
    </>
  )
}
