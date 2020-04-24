import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchFunctionality from './Search/SearchFunctionality';

class CategoryResult extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: ''
    };
  }

  componentDidMount() {
    axios.get('/category/all')
        .then(res => {
          this.setState({ products: res.data });
        });
  }

  render() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const content = searchParams.get('content');
    console.log(content);

    return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
            </div>
            <div className="panel-body">
              <h6 align="left"><Link to="/"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"/> Home</Link></h6>
              <h6 align="right"><Link to="/create"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"/> Add Product</Link></h6>
              <h5 className="panel-title" >
                Category results {content && `for "${content}"`}
              </h5>
              <SearchFunctionality products={this.state.products} content={content} category={true}/>
            </div>
          </div>
        </div>
    );
  }
}

export default CategoryResult;
