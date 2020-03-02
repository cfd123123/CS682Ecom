import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      shortDescription: '',
      longDescription: '',
      price: '',
      quantity: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, shortDescription, longDescription, price, quantity } = this.state;

    axios.post('/products', { name, shortDescription, longDescription, price, quantity })
        .then((result) => {
          this.props.history.push("/")
        });
  }

  render() {
    const { name, shortDescription, longDescription, price, quantity } = this.state;
    return (
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">
                ADD PRODUCT
              </h3>
            </div>
            <div class="panel-body">
              <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Products List</Link></h4>
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <label for="isbn">Name:</label>
                  <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
                </div>
                <div class="form-group">
                  <label for="title">ShortDescription:</label>
                  <input type="text" class="form-control" name="shortDescription" value={shortDescription} onChange={this.onChange} placeholder="ShortDescription" />
                </div>
                <div class="form-group">
                  <label for="author">LongDescription:</label>
                  <input type="text" class="form-control" name="longDescription" value={longDescription} onChange={this.onChange} placeholder="LongDescription" />
                </div>
                <div class="form-group">
                  <label for="author">Price:</label>
                  <input type="text" class="form-control" name="price" value={price} onChange={this.onChange} placeholder="Price" />
                </div>
                <div class="form-group">
                  <label for="author">Quantity:</label>
                  <input type="text" class="form-control" name="quantity" value={quantity} onChange={this.onChange} placeholder="Quantity" />
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default Create;
