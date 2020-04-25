import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    axios.get('/products/all')
        .then(res => {
          this.setState({ products: res.data });
          console.log(this.state.products);
        });
  }

  render() {
    return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-body">
              <h6 align="right"><Link to="/create"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"/> Add Product</Link></h6>
              <h5 className="panel-title" >
                CART PRODUCTS LIST 
              </h5>
              <table className="table table-stripe">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {this.state.products.map(c =>
                    <tr>
                      
                    </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    );
  }
}

export default Cart;