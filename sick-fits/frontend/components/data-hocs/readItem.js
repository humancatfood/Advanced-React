import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';



export const READ_ITEM_QUERY = gql`
  query READ_ITEM_QUERY (
    $id: ID!
  ) {
    item(where: {
      id: $id
    }) {
      id
      title
      description
      price
      image
      largeImage
    }
  }

`;


const readItem = (id, children) => (
  <Query
    query={ READ_ITEM_QUERY }
    variables={{ id }}
    children={({ data, loading, error }) => children({
      item: data.item,
      error,
      isLoading: loading,
    })}
  />
);

export default readItem;
