import React from 'react';
import proptypes from 'prop-types';

import Form from './styles/Form';
import DisplayError from './ErrorMessage';



const ItemForm = ({ defaultIitem:  { title, price, description }, isLoading, error, onSubmit }) => (
  <Form
    onSubmit={e => {
      e.preventDefault();
      onSubmit({
        title: e.target.title.value,
        price: parseInt(e.target.price.value),
        description: e.target.description.value,
      });
    }}
  >
    <DisplayError error={error} />
    <fieldset
      disabled={isLoading}
      aria-busy={isLoading}
    >
      <label htmlFor="title">
            Title
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          defaultValue={ title }
          required
        />
      </label>
      <label htmlFor="price">
            Price
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          defaultValue={ price }
          required
        />
      </label>
      <label htmlFor="description">
            Description
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          defaultValue={ description }
          required
        />
      </label>
      <button type="submit">Submit</button>
    </fieldset>
  </Form>
);

ItemForm.propTypes = {
  defaultIitem: proptypes.shape({
    title: proptypes.string.isRequired,
    price: proptypes.number.isRequired,
    description: proptypes.string
  }),
  onSubmit: proptypes.func.isRequired,
  isLoading: proptypes.bool,
  error: proptypes.string,
};



export default ItemForm;
