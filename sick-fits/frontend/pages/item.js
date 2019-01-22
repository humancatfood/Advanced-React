import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from './../components/ErrorMessage';
import Item from './../components/Item';



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

const ItemPage = ({ query: { id } }) => (
  <Query
    query={ READ_ITEM_QUERY }
    variables={{ id }}
    children={({ data: { item }, loading, error }) => (
      <>
        { loading && 'loading...' }
        <ErrorMessage error={error} />
        { item && <Item item={item} /> }
      </>
    )}
  />
);

export default ItemPage;
