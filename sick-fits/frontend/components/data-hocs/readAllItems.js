import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { perPage } from './../../config';



export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY ($skip: Int=0, $first: Int=${perPage}) {
    items (
      orderBy: updatedAt_DESC
      skip: $skip
      first: $first
    ) {
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


const withReadAllItems = (page, children) => (
  <Query
    query={ ALL_ITEMS_QUERY }
    variables={{
      skip: (page - 1) * perPage,
    }}
  >
    {({data, loading, error }) => children({
      items: data.items,
      error,
      isLoading: loading,
    })}
  </Query>
);

export default withReadAllItems;
