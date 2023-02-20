import { useSubscription } from '@apollo/client'
import { CONTACT_ADMIN_CREATED_SUBSCRIPTION } from 'src/graphql/subscriptions'
import { contactAdminCreated } from 'types/graphql'

export const Responses = () => {
  const { data, loading, error } = useSubscription<contactAdminCreated>(
    CONTACT_ADMIN_CREATED_SUBSCRIPTION
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h2>New ContactAdmin:</h2>
      {data && (
        <div>
          <p>Name: {data.contactAdminCreated.name}</p>
          <p>Message: {data.contactAdminCreated.message}</p>
        </div>
      )}
    </div>
  )
}
