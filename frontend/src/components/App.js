import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
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
              <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
              <Link to="/Result">
              <input type="button" className="search_btn" Onclick='search'/>
              </Link>
            </div>
            <div class="panel-body">
              <h6 align="right"><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Product</Link></h6>
              <h5 class="panel-title" >
                PRODUCTS LIST (test)
              </h5>
              <table class="table table-stripe">
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
                      <td>{c.name}</td>
                      <td>{c.shortDescription}</td>
                      <td>{c.price}</td>
                      <td>{c.quantity}</td>
                      <td><Link to={`/show/${c.id}`} ><Button variant="outline-info" size="sm">Edit</Button></Link></td>
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