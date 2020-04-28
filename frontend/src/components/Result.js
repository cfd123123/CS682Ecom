import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchFunctionality from './Search/SearchFunctionality';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';

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
    console.log(content);
    return (
        <div className="container">
          <div className="panel-panel-default">
            <div className="panel-heading">
            </div>
            <div className="panel-body">
              <div className="add-product-button">
                <Link to="/create"><Button variant="light" size="sm"><FontAwesomeIcon icon={faPlusCircle} /> Add Product</Button></Link>
              </div>
              <h5 className="panel-title" >
                Search results {content && `for "${content}"`}
              </h5>
              <SearchFunctionality products={this.state.products} content={content_insensitive_case} category={false}/>
            </div>
          </div>
        </div>
    );
  }
}

export default Result;
