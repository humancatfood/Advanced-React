import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import formatMoney from './../lib/formatMoney';

import Form from './styles/Form';
import DisplayError from './ErrorMessage';




const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION (
    $title: String!,
    $description: String!,
    $price: Int!,
    $image: String,
    $largeImage: String,
  ) {
    createItem(data: {
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    }) {
      id
    }
  }

`;


class CreateItem extends Component {

  state = {
    title: '',
    description: '',
    price: 0,
    image: '',
    largeImage: '',
  }

  handleChange = e => this.setState({
    [e.target.name]: e.target.name === 'price' ? parseFloat(e.target.value) : e.target.value
  })


  render () {

    return (
      <Mutation
        mutation={CREATE_ITEM_MUTATION}
        variables={this.state}
        children={(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              const result = await createItem();
              Router.push({
                pathname: '/item',
                query: {
                  id: result.data.createItem.id,
                }
              });
            }}
          >
            <DisplayError error={error} />
            <fieldset
              disabled={loading}
              aria-busy={loading}
            >
              <label htmlFor="title">
                  Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={ this.state.title }
                  onChange={ this.handleChange }
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
                  value={ this.state.price }
                  onChange={ this.handleChange }
                  required
                />
              </label>
              <label htmlFor="description">
                  Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={ this.state.description }
                  onChange={ this.handleChange }
                  required
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      />
    );

  }

}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
