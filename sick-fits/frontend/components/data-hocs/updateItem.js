import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { READ_ITEM_QUERY } from './readItem';



const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION (
    $id: ID!
    $title: String
    $description: String
    $price: Int
    $image: String
    $largeImage: String
  ) {
    updateItem(
      data: {
        title: $title
        description: $description
        price: $price
        image: $image
        largeImage: $largeImage
      }
      where: {
        id: $id
      }
    ) {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`;


const withUpdateItem = (id, children) => (
  <Mutation
    mutation={ UPDATE_ITEM_MUTATION }
    variables={{ id }}

    update={(cache, { data: { updateItem } }) => cache.writeQuery({
      query: READ_ITEM_QUERY,
      data: updateItem,
    })}

    children={(updateItem, { loading, error }) =>
      children({
        onUpdateItem: item => updateItem({ variables: {
          ...item,
          id,
        }}),
        error,
        isLoading: loading,
      })
    }

  />
);

export default withUpdateItem;
