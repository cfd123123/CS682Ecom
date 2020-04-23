import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchFunctionality from './Search/SearchFunctionality';

class Result extends Component {

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
        });
  }

  setCase(content) {
    return content ? content.toLowerCase() : "";
  }

  render() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const content = searchParams.get('content');
    const content_insensitive_case = this.setCase(content);

    return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
            </div>
            <div className="panel-body">
              <h6 align="left"><Link to="/"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"/> Home</Link></h6>
              <h6 align="right"><Link to="/create"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"/> Add Product</Link></h6>
              <h5 className="panel-title" >
                Search results {content && `for "${content}"`}
              </h5>
              <SearchFunctionality products={this.state.products} content={content_insensitive_case}/>
            </div>
          </div>
        </div>
    );
  }
}

export default Result;
