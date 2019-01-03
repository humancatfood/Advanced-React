import React from 'react';
import proptypes from 'prop-types';

import Form from './styles/Form';
import DisplayError from './ErrorMessage';



const ItemForm = ({ defaultItem:  { title, price, description }, isLoading, error, onSubmit }) => (
  <Form
    onSubmit={async e => {
      e.preventDefault();

      const { title, price, description, image } = e.target;
      const file = image.files[0];
      let fileName, fileNameLarge;
      if (file) {
        const fd = new FormData();
        fd.append('upload_preset', 'sick-fits-items');
        fd.append('tags', 'browser_upload');
        fd.append('file', file);
        const result = await fetch('https://api.cloudinary.com/v1_1/humancatfood/upload', {
          method: 'POST',
          body: fd,
        }).then(response => response.json());

        fileName = result.eager[0].secure_url;
        fileNameLarge = result.secure_url;

      } else {
        fileName = fileNameLarge = '';
      }

      onSubmit({
        title: title.value,
        price: parseInt(price.value),
        description: description.value,
        image: fileName,
        imageLarge: fileNameLarge,
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
      <label htmlFor="image">
            Image
        <input
          type="file"
          id="image"
          name="image"
          placeholder="Image"
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
