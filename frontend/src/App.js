import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    axios.get('/products')
        .then(res => {
          this.setState({ products: res.data });
          console.log(this.state.products);
        });
  }

  render() {
    return (
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">
                PRODUCTS LIST
              </h3>
            </div>
            <div class="panel-body">
              <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Product</Link></h4>
              <table class="table table-stripe">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {this.state.products.map(c =>
                    <tr>
                      <td><Link to={`/show/${c.id}`}>{c.name}</Link></td>
                      <td>{c.shortDescription}</td>
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

export default App;
