import { useLocation } from '@redwoodjs/router'
import { useEffect, useState } from 'react'
import {
  BlogPageOrderBy,
  BlogPageOrderKey,
} from 'src/store/zustand/blogPageQueryStore'

interface HookProps {}

type ReturnType = Partial<{
  cursor: {
    id: number
  }
  orderBy: {
    key: BlogPageOrderKey
    order: BlogPageOrderBy
  }
  filter: string
  skip: number
  take: number
}>

type State = {
  skip: number
  take: number
  filter: string
  orderByKey: BlogPageOrderKey
  orderByOrder: BlogPageOrderBy
  cursor: number
}

function parseSearchStringToState(user_query: string): Partial<State> {
  const user_query_state: Partial<State> = {}
  const searchParams = new URLSearchParams(user_query)
  for (const [key, value] of searchParams.entries()) {
    if (key === 'skip') {
      if (!isNaN(Number(value))) {
        user_query_state.skip = Number(value)
      }
    } else if (key === 'take') {
      if (!isNaN(Number(value))) {
        user_query_state.take = Number(value)
      }
    } else if (key === 'filter') {
      user_query_state.filter = value
    } else if (key === 'key') {
      if (value === 'createdAt' || value === 'score' || value === 'activity') {
        user_query_state.orderByKey = value as BlogPageOrderKey
      }
    } else if (key === 'order') {
      if (value === 'asc' || value === 'desc') {
        user_query_state.orderByOrder = value as BlogPageOrderBy
      }
    } else if (key === 'cursor') {
      if (!isNaN(Number(value))) {
        user_query_state.cursor = Number(value)
      }
    }
  }
  return user_query_state
}

function parseStateToReturnType(user_query_state: Partial<State>): ReturnType {
  const isPaginationValid =
    (!isNaN(user_query_state?.skip) &&
      !isNaN(user_query_state?.take) &&
      user_query_state?.cursor === undefined) ||
    (!isNaN(user_query_state?.take) &&
      !isNaN(user_query_state?.take) &&
      !isNaN(user_query_state?.cursor))

  const isCursorValid = !isNaN(user_query_state?.cursor)

  const isFilterValid =
    user_query_state?.filter && user_query_state?.filter !== ''

  const isOrderByValid =
    user_query_state?.orderByKey && user_query_state.orderByOrder

  const xq = {
    ...(isPaginationValid && {
      skip: user_query_state?.skip,
      take: user_query_state?.take,
    }),
    ...(isFilterValid && { filter: user_query_state?.filter }),
    ...(isOrderByValid && {
      orderBy: {
        key: user_query_state?.orderByKey,
        order: user_query_state?.orderByOrder,
      },
    }),
    ...(isPaginationValid &&
      isCursorValid && {
        cursor: {
          id: user_query_state?.cursor,
        },
      }),
  }

  return xq
}

export function useBlogPageQueries(): ReturnType {
  const { search } = useLocation()

  const [query, setQuery] = useState<ReturnType>(
    parseStateToReturnType(parseSearchStringToState(search))
  )

  useEffect(() => {
    const searchState = parseSearchStringToState(search)
    const queryState = parseStateToReturnType(searchState)
    setQuery((old) => {
      if (JSON.stringify(old) !== JSON.stringify(queryState)) {
        return queryState
      }
      return old
    })
  }, [search])

  return query
}
