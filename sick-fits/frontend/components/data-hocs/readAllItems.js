import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';



export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
      updatedAt
    }
  }
`;


const withReadAllItems = children => (
  <Query
    query={ ALL_ITEMS_QUERY }
  >
    {({data, loading, error }) => children({
      items: data.items,
      error,
      isLoading: loading,
    })}
  </Query>
);

export default withReadAllItems;
