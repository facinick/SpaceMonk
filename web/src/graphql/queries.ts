export const MY_DATA_QUERY = gql`
  query MY_DATA {
    me {
      id
      userRoles {
        id
      }
      posts {
        id
      }
      votes {
        id
      }
      comments {
        id
      }
    }
  }
`;

export const ALL_POSTS_QUERY = gql`
  query ALL_POSTS {
    posts{
      id
      author {
        id
      }
      comments {
        id
      }
      votes {
        id
      }
    }
  }
`;

export const POST_BY_ID_QUERY = gql`
# your params will crom from here
  query POST_BY_ID ($id: Int!) {
# actual query is below, ex: post(id: 4)
    post(id: $id){
      id
      title
      body
      headerImageUrl
      createdAt
      updatedAt
      author {
        id
        username
      }
      votes {
        id
        value
      }
    }
  }
`;


// const MY_QUERY = gql`
//   query ($arg1: Int, $arg2: String) {
//     posts(arg1: $arg1, arg2: $arg1) {
//       id
//     }
//   }
// `;
