import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { ALL_ITEMS_QUERY } from './data-hocs/readAllItems';



export const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION ($id: ID!) {
    deleteItem(where: {
      id: $id
    }) {
      id
    }
  }
`;

const DeleteItemButton = ({ item: { id } }) => (
  <Mutation
    mutation={ DELETE_ITEM_MUTATION }
    variables={{ id }}
    update={(cache, { data: { deleteItem: { id: deletedID }}}) => {
      const { items } = cache.readQuery({ query: ALL_ITEMS_QUERY });
      cache.writeQuery({
        query: ALL_ITEMS_QUERY,
        data: {
          items: items.filter(item => item.id !== deletedID)
        }
      });
    }}
    children={(deleteItem, { loading: isLoading }) => (
      <button
        onClick={() => window.confirm('really?') && deleteItem()}
        disabled={isLoading}
      >
    Delet{ isLoading ? 'ing' : 'e'} Item
      </button>
    )}
  />
);

export default DeleteItemButton;
