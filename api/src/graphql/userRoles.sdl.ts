export const schema = gql`
  #----------------------- Prisma Reference ---------------------#
  # id        Int      @id @default(autoincrement())             #
  # createdAt DateTime @default(now())                           #
  # updatedAt DateTime @default(now())                           #
  # name      String                                             #
  # user      User     @relation(fields: [userId], references: [id])
  # userId    Int                                                #
  #--------------------------------------------------------------#
  type UserRole {
    id: Int!#---------------------------#public
    # createdAt: DateTime!--------------#not_available
    # updatedAt: DateTime!--------------#not_available
    name: String!#----------------------#public
    # user: User#-----------------------#not_available
    # userId: Int#----------------------#not_available
  }
`
