import { formatTimeDifferenceFromNow } from 'src/utils/string'
import { USER_PRESENCE } from 'types/graphql'

interface ComponentProps {
  activeUsers: USER_PRESENCE['userPresences']
}

const ActiveUsersComponent = (props: ComponentProps) => {
  const { activeUsers } = props

  return (
    <>
      <div className="badge-info badge m-5 gap-2">Live ~3s poll</div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {activeUsers.map((activeUser, index) => {
              const ls = new Date(activeUser.lastSeen)

              // console.log(
              //   `user: ${
              //     activeUser.user.username
              //   } => lastSeen: ${ls} / ${ls.getTime()}`
              // )

              // console.log(
              //   `user: ${
              //     activeUser.user.username
              //   } => now: ${getCurrentUTCTime()} / ${getCurrentUTCTime().getTime()}`
              // )

              // console.log(
              //   `user ${
              //     activeUser.user.username
              //   } : ${ls} last seen: ${formatTimeDifferenceFromNow(
              //     new Date(activeUser.lastSeen)
              //   )}`
              // )

              return (
                <tr key={index}>
                  <th>{index}</th>
                  <td>
                    <address>
                      <a rel="author" href="#">
                        @{activeUser.user.username}
                      </a>
                    </address>
                  </td>
                  <td>
                    {formatTimeDifferenceFromNow(new Date(activeUser.lastSeen))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ActiveUsersComponent
