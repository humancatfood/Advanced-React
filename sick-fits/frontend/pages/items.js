import readAllItems from './../components/data-hocs/readAllItems';

import ItemList from './../components/Items';



const ItemListPage = () => readAllItems(({ items, isloading, error }) => ItemList({
  items,
  isloading,
  error,
}));

export default ItemListPage;
