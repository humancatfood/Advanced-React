import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';



export const READ_USER_QUERY = gql`
  query READ_USER_QUERY {
    me {
      email
      name
      permissions
    }
  }
`;


const User = () => (
  <Query
    query={ READ_USER_QUERY }
  >
    {
      ({ data: { me: user }, loading, error }) => console.log('me:', user, loading, error) || (
        <p>
          {
            error ? error.msg :
              loading ? 'loading..' :
                user ? user.name : '--'
          }
        </p>
      )
    }
  </Query>
);


export default User;
