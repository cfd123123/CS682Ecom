import React from 'reactn';
import { Link } from 'react-router-dom';
import ProductResult from './Search/ProductResult';
import CategoryService from '../services/CategoryService';

/**
 * This component is used to display a list of products that belong to a chosen
 * category.
 */
class CategoryResult extends React.PureComponent {
  /**
   * Constructs this component with initial state values.
   */
  constructor(props) {
    super(props);
    /**
     * categories - the list of all available categories
     */
    this.state = {
      categories: null
    };
  }

  /**
   * After mounting, this function calls the {@link CategoryService#getAll}
   * function, then updates this component's state with the backend server
   * response.
   */
  componentDidMount() {
    CategoryService.getAll().then(
        res => {
          this.setState({ categories: res.data });
        }
    );
  }

  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
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
export default CategoryResult;