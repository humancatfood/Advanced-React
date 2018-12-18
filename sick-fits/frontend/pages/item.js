import React from 'react';

import DisplayItem from './../components/DisplayItem';



const ItemPage = ({ query }) => (
  <div>
    <DisplayItem id={query.id} />
  </div>
);

export default ItemPage;
