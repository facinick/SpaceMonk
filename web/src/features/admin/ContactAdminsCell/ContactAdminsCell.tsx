import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { CONTACT_ADMINS_QUERY } from 'src/graphql/queries'
import { CONTACT_ADMINS } from 'types/graphql'
import { ContactAdminsListComponent } from '../ContactAdminsListComponent/ContactAdminsListComponent'

export const QUERY = CONTACT_ADMINS_QUERY

export const beforeQuery = (props) => {
  return {
    variables: props,
    pollInterval: 3000,
  }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  contactAdmins,
}: CellSuccessProps<CONTACT_ADMINS>) => {
  return <ContactAdminsListComponent contactAdmins={contactAdmins} />
}
