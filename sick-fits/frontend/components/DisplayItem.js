import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import DisplayError from './ErrorMessage';
import Item from './Item';



const DISPLAY_ITEM_QUERY = gql`
  query DISPLAY_ITEM_QUERY (
    $id: ID!
  ) {
    item(where: {
      id: $id
    }) {
      title
      description
      price
      image
      largeImage
    }
  }

`;


const DisplayItem = ({ id }) => (
  <Query
    query={DISPLAY_ITEM_QUERY}
    variables={{
      id
    }}
    children={({ data, loading, error }) => (
      <>
        { loading && 'loading...' }
        <DisplayError error={error} />
        { data.item && <Item item={data.item} /> }
      </>
    )}
  />
);


export default DisplayItem;
export { DISPLAY_ITEM_QUERY };
