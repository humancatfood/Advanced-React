import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { ALL_ITEMS_QUERY } from './readAllItems';



const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION (
    $title: String!,
    $description: String!,
    $price: Int!,
    $image: String,
    $largeImage: String,
  ) {
    createItem(data: {
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    }) {
      id
      title
      description
      price
      image
      largeImage
      updatedAt
    }
  }
`;


const withCreateItem = children => (
  <Mutation
    mutation={ CREATE_ITEM_MUTATION }
    update={(cache, { data: { createItem } }) => {

      const { items } = cache.readQuery({
        query: ALL_ITEMS_QUERY,
      });

      cache.writeQuery({
        query: ALL_ITEMS_QUERY,
        data: {
          items: [ ...items, createItem, ],
        },
      });
    }}
  >
    {(createItem, { loading, error }) => children({
      onCreateItem: createItem,
      error,
      isLoading: loading,
    })}
  </Mutation>
);

export default withCreateItem;
