import { useState } from 'react'
import {
  DocumentNode,
  ApolloError,
  useApolloClient,
  OperationVariables,
} from '@apollo/client'

type QueryVariables = Record<string, any>

type UseLazyQueryResult<TData, TVariables extends QueryVariables> = [
  (variables?: TVariables) => void,
  { data: TData | undefined; error: ApolloError | undefined; loading: boolean }
]

function useLazyQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode
) {
  const client = useApolloClient()
  return React.useCallback(
    (variables: TVariables) =>
      client.query<TData, TVariables>({
        query: query,
        variables: variables,
        fetchPolicy: 'cache-first',
      }),
    [client]
  )
}

function useLazyQueryModded<
  TData = any,
  TVariables extends QueryVariables = QueryVariables
>(query: DocumentNode): UseLazyQueryResult<TData, TVariables> {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<TData | undefined>(undefined)
  const [error, setError] = useState<ApolloError | undefined>(undefined)

  const runQuery = useLazyQuery<TData, TVariables>(query)

  const executeQuery = async (variables?: TVariables) => {
    setLoading(true)
    setData(undefined)
    setError(undefined)

    try {
      const result = await runQuery(variables)
      setData(result.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const result = { data, error, loading }

  return [executeQuery, result]
}

export { useLazyQueryModded }
