import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { generateBasicTable } from './searchFunctionality.js';

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
        });
  }

  render() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const content = searchParams.get('content');
    var content_insensitive_case = content.toLowerCase();

    return (
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
            </div>
            <div class="panel-body">
              <h6 align="right"><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Product</Link></h6>
              <h5 class="panel-title" >
                Search results for "{content}"
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
                  {
                    this.state.products.filter((searchedItem)=>
                        searchedItem.name.toLowerCase()==content_insensitive_case ||
                        searchedItem.shortDescription.split(" ").map(w => w.toLowerCase()).includes(content_insensitive_case) ||
                        searchedItem.longDescription.split(" ").map(w => w.toLowerCase()).includes(content_insensitive_case)
                        ).map (
                      (c)=>
                      <tr>
                      <td><Link to={`/show/${c.id}`}>{c.name}</Link></td>
                      <td>{c.shortDescription}</td>
                      <td>{c.price}</td>
                      <td>{c.quantity}</td>
                    </tr>)
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
