import Router from 'next/router';

import ItemForm from '../components/ItemForm';
import withUpdateItem from './../components/data-hocs/updateItem';



const UpdatePage = ({ query: { id } }) => withUpdateItem(id, ({ item, updateItem, isLoading, error }) => ItemForm({
  defaultItem: item || {},
  onSubmit: async item => {

    const result = await updateItem(item);

    console.log('result:', result);

    Router.push({
      pathname: '/item',
      query: {
        id: result.data.updateItem.id,
      }
    });
  },
  isLoading,
  error,
}));


export default UpdatePage;
