import React from 'react';
import styled from 'styled-components';
import Item from './Item';



const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const sortItems = ({ updatedAt: a }, { updatedAt: b }) => a > b ? -1 : a < b ? 1 : 0;

const Items = ({ items, isLoading, error }) => (
  <Center>
    {
      isLoading && <p>Loading...</p>
    }
    {
      error && <p>Error: {error.message}</p>
    }
    <ItemsList>
      {
        items && items.sort(sortItems).map(item => <Item item={item} key={item.id} />)
      }
    </ItemsList>
  </Center>
);

export default Items;
