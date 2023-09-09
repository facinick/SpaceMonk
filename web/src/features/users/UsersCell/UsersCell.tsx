import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import type { UsersQuery } from 'types/graphql'


export const QUERY = gql`
  query UsersQuery {
    users {
      edges {
        node {
          id
        }
      }
      
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ users }: CellSuccessProps<UsersQuery>) => {
  return (
    <ul>
      {users.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
