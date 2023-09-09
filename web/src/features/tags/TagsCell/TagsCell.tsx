import { navigate, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { CellEmpty } from 'src/features/redwood/CellWrapper/Empty'
import { CellError } from 'src/features/redwood/CellWrapper/Error'
import { CellLoading } from 'src/features/redwood/CellWrapper/Loading'
import { TAGS_QUERY } from 'src/graphql/queries'
import { Chip } from 'src/ui/chip/Chip'
import { generateUUID } from 'src/utils/math'
import type { TAGS } from 'types/graphql'

export const QUERY = TAGS_QUERY

export const Loading = () => <CellLoading></CellLoading>

export const Empty = () => <CellEmpty itemName={'Tag'}></CellEmpty>

export const Failure = ({ error }: CellFailureProps) => <CellError message={error?.message}></CellError>

export const Success = ({ tags }: CellSuccessProps<TAGS>) => {
  return (
    <div className={`flex flex-row flex-wrap gap-y-2`}>
        {tags.edges.map((value, index, array) => {
          return (<Chip onClick={() => navigate(routes.tag({name: value.node.name}))} key={generateUUID()} >{value.node.name}</Chip>)
        })}
    </div>
  )
}
