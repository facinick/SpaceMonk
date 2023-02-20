import { CellSuccessProps } from '@redwoodjs/web'
import { CONTACT_ADMINS } from 'types/graphql'

interface ComponentProps {
  contactAdmins: CellSuccessProps<CONTACT_ADMINS>['contactAdmins']
}

const ContactAdminsListComponent = ({ contactAdmins }: ComponentProps) => {
  return (
    <>
      <div className="badge-info badge m-5 gap-2">Live ~3s poll</div>
      <ul className="flex flex-wrap gap-2">
        {contactAdmins.map((contactAdmin) => {
          const readableTime = new Date(contactAdmin.createdAt).toDateString()

          return (
            <li key={contactAdmin.id}>
              <div className="max-w-96 card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{contactAdmin.name}</h2>
                  <p>{contactAdmin.message}</p>
                  {contactAdmin.user?.username && (
                    <address className="author">
                      By{' '}
                      <a rel="author" href="#">
                        @{contactAdmin.user?.username}
                      </a>
                    </address>
                  )}
                  {!contactAdmin.user?.username && (
                    <address className="author">By anonymous</address>
                  )}
                  <time
                    className="inline"
                    title={readableTime}
                    dateTime={contactAdmin.createdAt}
                  >
                    on {readableTime}
                  </time>
                </div>
              </div>
              <></>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export { ContactAdminsListComponent }
