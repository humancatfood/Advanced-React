import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import ItemForm from '../components/ItemForm';

import { ALL_ITEMS_QUERY } from './items';



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


const SellPage = () => (
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
    {(createItem, { loading, error }) => ItemForm({

      defaultItem: {
        title: '',
        price: 0,
        description: ''
      },

      onSubmit: async item => {
        const result = await createItem({
          variables: { ...item }
        });
        Router.push({
          pathname: '/item',
          query: {
            id: result.data.createItem.id,
          }
        });
      },

      onCreateItem: createItem,
      error,
      isLoading: loading,
    })}
  </Mutation>
);


export default SellPage;
