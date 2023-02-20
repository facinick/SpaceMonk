export const CONTACT_ADMIN_CREATED_SUBSCRIPTION = gql`
  subscription contactAdminCreated {
    contactAdminCreated {
      id
      name
      message
    }
  }
`
