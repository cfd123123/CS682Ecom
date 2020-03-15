import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Show extends Component {

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

  delete(id){
    console.log(id);
    axios.delete('/products/'+id)
        .then((result) => {
          this.props.history.push("/")
        });
  }

  render() {
    return (
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">
                Product Details
              </h3>
            </div>
            <div class="panel-body">
              <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Products List</Link></h4>
              <dl>
                <dt>Name:</dt>
                <dd>{this.state.product.name}</dd>
                <dt>ShortDescription:</dt>
                <dd>{this.state.product.shortDescription}</dd>
                <dt>LongDescription:</dt>
                <dd>{this.state.product.longDescription}</dd>
                <dt>Price:</dt>
                <dd>{this.state.product.price}</dd>
                <dt>Quantity:</dt>
                <dd>{this.state.product.quantity}</dd>
              </dl>
              <Link to={`/edit/${this.state.product.id}`} class="btn btn-success">Edit</Link>&nbsp;
              <button onClick={this.delete.bind(this, this.state.product.id)} class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
    );
  }
}

export default Show;