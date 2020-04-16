import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    axios.get('/products/'+this.props.match.params.id)
        .then(res => {
          this.setState({ product: res.data });
          console.log(this.state.product);
        });
  }

  onChange = (e) => {
    const state = this.state.product
    state[e.target.name] = e.target.value;
    this.setState({product:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, shortDescription, longDescription, price, quantity } = this.state.product;

    axios.put('/products/'+this.props.match.params.id, { name, shortDescription, longDescription, price, quantity })
        .then((result) => {
          this.props.history.push("/show/"+this.props.match.params.id)
        });
  }

  render() {
    return (
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">
                EDIT Product
              </h3>
            </div>
            <div class="panel-body">
              <h4><Link to={`/show/${this.state.product.id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Product List</Link></h4>
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <label for="name">Name:</label>
                  <input type="text" class="form-control" name="name" value={this.state.product.name} onChange={this.onChange} placeholder="Name" />
                </div>
                <div class="form-group">
                  <label for="title">ShortDescription:</label>
                  <input type="text" class="form-control" name="shortDescription" value={this.state.product.shortDescription} onChange={this.onChange} placeholder="ShortDescription" />
                </div>
                <div class="form-group">
                  <label for="author">LongDescription:</label>
                  <input type="text" class="form-control" name="longDescription" value={this.state.product.longDescription} onChange={this.onChange} placeholder="LongDescription" />
                </div>
                <div class="form-group">
                  <label for="author">Price:</label>
                  <input type="text" class="form-control" name="price" value={this.state.product.price} onChange={this.onChange} placeholder="Price" />
                </div>
                <div class="form-group">
                  <label for="author">Quantity:</label>
                  <input type="text" class="form-control" name="quantity" value={this.state.product.quantity} onChange={this.onChange} placeholder="Quantity" />
                </div>
                <button type="submit" class="btn btn-default">Update</button>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default Edit;