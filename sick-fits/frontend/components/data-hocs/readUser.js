import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';



export const READ_USER_QUERY = gql`
  query me {
    id
    title
    email
    name
    permissions
  }
`;


const withUser = children => (
  <Query
    query={ READ_USER_QUERY }
  >
    {
      ({ data, loading, error }) => children({
        user: data.user,
        error: error,
        isLoading: loading,
      })
    }
  </Query>
);

export default withUser;
