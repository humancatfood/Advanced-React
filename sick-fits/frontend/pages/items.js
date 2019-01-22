import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ItemList from './../components/Items';
import Pagination from './../components/Pagination';

import { perPage } from './../config';



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


const ItemListPage = ({ query: { page } }) => (
  <Query
    query={ ALL_ITEMS_QUERY }
    variables={{
      skip: (page - 1) * perPage,
    }}
  >
    {
      ({data, loading, error }) => (
        <>
          <Pagination page={page} />
          <ItemList
            items={ data.items }
            isloading={ loading }
            error={ error }
          />
          <Pagination page={page} />
        </>
      )
    }
  </Query>
);

export default ItemListPage;
