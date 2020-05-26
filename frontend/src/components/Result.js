import React from 'reactn';
import { Link } from 'react-router-dom';
import SearchFunctionality from './Search/SearchFunctionality';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import ProductService from "../services/ProductService";

/**
 * This component produces a search result page to the user.
 */
class Result extends React.PureComponent {
  /**
   * Constructs this component with initial state values.
   * @param props Props arrive in the form of a url query string
   */
  constructor(props) {
    super(props);
    /**
     * products - the list of products to be filtered for display
     */
    this.state = {
      products: undefined
    };
  }

  /**
   * After mounting, this function calls the
   * {@link ProductService#getAllProducts} function, updating this component's
   * state with the backend server response.
   */
  componentDidMount() {
    ProductService.getAllProducts().then(res => {
      this.setState({ products: res.data });
    });
  }

  /**
   * Forces the query string to be lower-case.
   * @param searched the query string
   * @returns {string} the query string in all lower-case
   */
  setCase(searched) {
    return searched ? searched.toLowerCase() : "";
  }

  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
  render() {
    const {products} = this.state;
    if (!products) {return null;}
    // get user input from search box
    const searchParams = new URLSearchParams(this.props.location.search);
    const searched = searchParams.get('searched');
    //Uniform text-transform
    const searched_insensitive_case = this.setCase(searched);
    return (
        <div className="container">
          <div className="panel-panel-default">
            <div className="panel-heading" />
            <div className="panel-body">
              <div className="add-product-button">
                <Link to="/create"><Button variant="light" size="sm"><FontAwesomeIcon icon={faPlusCircle} /> Add Product</Button></Link>
              </div>
              <h5 className="panel-title" >
                Search results {searched && `for "${searched}"`}
              </h5>
              <SearchFunctionality products={products} searched={searched_insensitive_case} categorySearch={false}/>
            </div>
          </div>
        </div>
    );
  }
}
export default Result;