import withReadAllItems from './../components/data-hocs/readAllItems';

import ItemList from './../components/Items';
import Pagination from './../components/Pagination';



const ItemListPage = ({ query: { page } }) => withReadAllItems(page, ({ items, isloading, error }) => (
  <>
    <Pagination page={page} />
    <ItemList
      items={ items }
      isloading={ isloading }
      error={ error }
    />
    <Pagination page={page} />
  </>
));

export default ItemListPage;
