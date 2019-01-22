import Router from 'next/router';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import ItemForm from '../components/ItemForm';




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

const UpdatePage = ({ query: { id } }) => (
  <Query
    query={ READ_ITEM_QUERY }
    variables={{ id }}
  >
    {({ data, loading: isLoadingItem, error: itemLoadError }) => (
      <Mutation
        mutation={ UPDATE_ITEM_MUTATION }
        variables={{ id }}

        update={(cache, { data: { updateItem } }) => cache.writeQuery({
          query: READ_ITEM_QUERY,
          data: {
            item: updateItem,
          },
        })}
      >
        {(onUpdateItem, { isUpdatingItem, itemUpdateError }) => (
          <ItemForm
            defaultItem={data.item || {}}
            onSubmit={async item => {
              const result = await onUpdateItem({
                variables: item
              });
              Router.push({
                pathname: '/item',
                query: {
                  id: result.data.updateItem.id,
                }
              });
            }}
            isLoading={isLoadingItem || isUpdatingItem}
            error={itemLoadError || itemUpdateError}
          />
        )}
      </Mutation>
    )}
  </Query>
);


export default UpdatePage;
