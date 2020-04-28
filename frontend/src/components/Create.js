import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      shortDescription: '',
      longDescription: '',
      price: '',
      quantity: '',
      category: '',
      categoryList: [],
      image: ''
    };
  }
  onChange = (event) => {
    const state = this.state
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  onClose = (event) => {
    const state = this.state
    state['categoryList'] = state['categoryList'].filter( c => c !== event.target.name);
    this.setState(state);
  };

  addCategories = (event) => {
    const state = this.state;
    if(event.target.value.substr(-1)===",") {
      state['categoryList'] = state['categoryList'].concat(event.target.value.replace(",",""));
      state[event.target.name] = '';
    }

    else {
      state[event.target.name] = event.target.value;
    }
    this.setState(state);

  };

  onSubmit = (event) => {
    event.preventDefault();
    const { name, shortDescription, longDescription, price, quantity, categoryList, image } = this.state;

    axios.post('/products/all', {
      name: name,
      shortDescription: shortDescription,
      longDescription: longDescription,
      price: price,
      quantity: quantity,
      categories: categoryList,
      image: image,
    }).then(
        result => {
          this.props.history.push("Result?content=");
        });
  };

  render() {
    const { name, shortDescription, longDescription, price, quantity, category, image } = this.state;
    return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                ADD PRODUCT
              </h3>
            </div>
            <div className="panel-body">
              <h4>
                <Link to="/Home">
                  {/*<span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>*/}
                  Products List
                </Link>
              </h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="isbn">Name:</label>
                  <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} placeholder="Product Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="title">Short Description:</label>
                  <input type="text" className="form-control" name="shortDescription" value={shortDescription} onChange={this.onChange} placeholder="This description appears on the product list" />
                </div>
                <div className="form-group">
                  <label htmlFor="author">Long Description:</label>
                  <input type="text" className="form-control" name="longDescription" value={longDescription} onChange={this.onChange} placeholder="This description appears on the product's page" />
                </div>
                <div className="form-group">
                  <label htmlFor="author">Price:</label>
                  <input type="number" className="form-control" name="price" value={price} onChange={this.onChange} placeholder="Price per item" />
                </div>
                <div className="form-group">
                  <label htmlFor="author">Quantity:</label>
                  <input type="number" className="form-control" name="quantity" value={quantity} onChange={this.onChange} placeholder="Quantity" />
                </div>
                <div className="form-group">
                  <label htmlFor="author">Product Image:</label>
                  <input type="text" className="form-control" name="image" value={image} onChange={this.onChange} placeholder="Image URL" />
                </div>

                <ul>
                  {this.state.categoryList.map((tags) => (
                    <li><Button variant="secondary" onClick={this.onClose} size="sm" name={tags}>{tags} &times;</Button></li>
                  ))}
                </ul>


                <div className="form-group">
                  <label htmlFor="author">Category:</label>
                  <input type="text[]" className="form-control" name="category" value={category} onChange={this.addCategories} placeholder="Category" />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default Create;
