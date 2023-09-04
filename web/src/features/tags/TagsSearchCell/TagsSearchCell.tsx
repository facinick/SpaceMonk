import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { useEffect } from 'react'
import { TAGS_QUERY } from 'src/graphql/queries'
import { useTagsStore } from 'src/store/zustand/tagsStore'
import { TAGS } from 'types/graphql'

export const QUERY = TAGS_QUERY

export const Loading = () => null

export const Empty = () => null

export const Failure = ({ error }: CellFailureProps) => null

export const Success = ({ tags }: CellSuccessProps<TAGS>) => {

  const {setTagsSearchResults} = useTagsStore()
  
  useEffect(() => {
    setTagsSearchResults(tags)
  }, [tags])

  return (null)
}
