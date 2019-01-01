import React from 'react';

import readItem from './../components/data-hocs/readItem';

import ErrorMessage from './../components/ErrorMessage';
import Item from './../components/Item';



const ItemPage = ({ query: { id } }) => readItem(id, ({ item, isloading, error }) => (
  <>
    { isloading && 'loading...' }
    <ErrorMessage error={error} />
    { item && <Item item={item} /> }
  </>
));

export default ItemPage;
