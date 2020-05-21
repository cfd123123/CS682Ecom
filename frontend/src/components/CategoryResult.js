import React from 'reactn';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductResult from './Search/ProductResult'

export default class CategoryResult extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categories: null
    };
  }

  componentDidMount() {
    axios.get('/category/all').then(
        res => {
          this.setState({ categories: res.data });
        }
    );
  }

  render() {
    const { categories } = this.state;
    if(!categories) { return null; }

    // Parse the url query string
    const resultsParam = new URLSearchParams(this.props.location.search).get('results');
    // filter the categories
    const results = categories.filter((category) => category.name === resultsParam );
    // construct ProductResult components for all products belonging to results
    const productResults = results.map((category) => category.products.map((productID) => {
      return <ProductResult id={productID} key={productID}/>
    }));

    return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <Link to="/" style={{'float':'left'}}>Home</Link>
              <Link to="/create" style={{'float':'right'}}>Add Product</Link>
              <br />
              <h5 className="panel-title" >
                Category results {resultsParam && `for "${resultsParam}"`}
              </h5>
            </div>
            <div className="panel-body">
              { productResults }
            </div>
          </div>
        </div>
    );
  }
}
