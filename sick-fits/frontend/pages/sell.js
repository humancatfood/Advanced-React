import Router from 'next/router';

import ItemForm from '../components/ItemForm';
import withCreateItem from './../components/data-hocs/createItem';



const SellPage = () => withCreateItem(({ onCreateItem, isLoading, error }) => ItemForm({
  defaultItem: {
    title: '',
    price: 0,
    description: ''
  },
  onSubmit: async item => {
    const result = await onCreateItem({
      variables: { ...item }
    });
    Router.push({
      pathname: '/item',
      query: {
        id: result.data.createItem.id,
      }
    });
  },
  isLoading,
  error,
}));


export default SellPage;
