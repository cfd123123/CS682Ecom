import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: undefined
    };
  }

  componentDidMount() {
    axios.get('/products/'+this.props.match.params.id)
        .then(response => {
          this.setState({ product: response.data });
          console.log(this.state.product);
        });
  }

  onChange = (event) => {
    const state = this.state.product;
    state[event.target.name] = event.target.value;
    this.setState({product:state});
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { name, shortDescription, longDescription, price, quantity } = this.state.product;

    axios.put('/products/'+this.props.match.params.id, { name, shortDescription, longDescription, price, quantity })
        .then((result) => {
          this.props.history.push("/show/"+this.props.match.params.id)
        });
  };

  render() {
    const {product} = this.state;
    return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                EDIT Product
              </h3>
            </div>
            {product &&
            <div className="panel-body">
              <h4><Link to={`/show/${product.id}`}><span className="glyphicon glyphicon-eye-open"
                                                         aria-hidden="true"/> Product List</Link></h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" className="form-control" name="name" value={product.name} onChange={this.onChange}
                         placeholder="Name"/>
                </div>
                <div className="form-group">
                  <label htmlFor="title">ShortDescription:</label>
                  <input type="text" className="form-control" name="shortDescription" value={product.shortDescription}
                         onChange={this.onChange} placeholder="ShortDescription"/>
                </div>
                <div className="form-group">
                  <label htmlFor="author">LongDescription:</label>
                  <input type="text" className="form-control" name="longDescription" value={product.longDescription}
                         onChange={this.onChange} placeholder="LongDescription"/>
                </div>
                <div className="form-group">
                  <label htmlFor="author">Price:</label>
                  <input type="text" className="form-control" name="price" value={product.price}
                         onChange={this.onChange} placeholder="Price"/>
                </div>
                <div className="form-group">
                  <label htmlFor="author">Quantity:</label>
                  <input type="text" className="form-control" name="quantity" value={product.quantity}
                         onChange={this.onChange} placeholder="Quantity"/>
                </div>
                <button type="submit" className="btn btn-default">Update</button>
              </form>
            </div>
            }
          </div>
        </div>
    );
  }
}

export default Edit;