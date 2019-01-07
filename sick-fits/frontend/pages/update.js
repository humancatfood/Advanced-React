import Router from 'next/router';

import ItemForm from '../components/ItemForm';
import withReadItem from './../components/data-hocs/readItem';
import withUpdateItem from './../components/data-hocs/updateItem';



const UpdatePage = ({ query: { id } }) =>
  withReadItem(id, ({ item, isLoading: isLoadingItem, error: itemLoadError }) =>
    withUpdateItem(id, ({ onUpdateItem, isLoading: isUpdatingItem, error: itemUpdateError }) =>
      ItemForm({
        defaultItem: item || {},
        onSubmit: async item => {
          const result = await onUpdateItem(item);
          Router.push({
            pathname: '/item',
            query: {
              id: result.data.updateItem.id,
            }
          });
        },
        isLoading: isLoadingItem || isUpdatingItem,
        error: itemLoadError || itemUpdateError,
      })
    )
  );


export default UpdatePage;
