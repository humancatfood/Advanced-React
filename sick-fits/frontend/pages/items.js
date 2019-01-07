import withReadAllItems from './../components/data-hocs/readAllItems';

import ItemList from './../components/Items';



const ItemListPage = () => withReadAllItems(({ items, isloading, error }) => ItemList({
  items,
  isloading,
  error,
}));

export default ItemListPage;
