import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { perPage } from './../config';

import PaginationStyles from './styles/PaginationStyles';



export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const PageLink = ({ page, isDisabled, children }) => (
  <Link
    href={{
      pathname: '/items',
      query: { page }
    }}
  >
    <a aria-disabled={isDisabled}>{ children }</a>
  </Link>
);

const Pagination = ({ page }) => (
  <Query
    query={ PAGINATION_QUERY }
    children={
      ({ data }) => {
        const count = data.itemsConnection.aggregate.count;
        const numPages = Math.ceil(count / perPage);
        const currentPage = parseFloat(page || 1);
        return (
          <div style={{ textAlign: 'center'}}>
            <PaginationStyles>
              <PageLink page={ currentPage - 1 } isDisabled={ currentPage <= 1 }>← Prev</PageLink>
              <p>Page { currentPage } of { numPages }</p>
              <p>{count} Items Total</p>
              <PageLink page={ currentPage + 1 } isDisabled={ currentPage >= numPages }>Next →</PageLink>
            </PaginationStyles>
          </div>
        );
      }
    }
  />
);

export default Pagination;
