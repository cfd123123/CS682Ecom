import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchFunctionality from './Search/SearchFunctionality';


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
            <h6 align="left"><Link to="/"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Home</Link></h6>
            <h6 align="right"><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Product</Link></h6>
            <h5 class="panel-title" >
              Search results for "{content}"
            </h5>
              <SearchFunctionality products={this.state.products} content={content_insensitive_case}/>
          </div>
        </div>
      </div>
  );
  }
}

export default App;