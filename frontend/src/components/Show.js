import React from 'reactn';
import { Link } from 'react-router-dom';
import ProductService from "../services/ProductService"

/**
 * Component used to display a single product's detailed information
 */
class Show extends React.PureComponent {
  /**
   * Cosntructs this component with initial state values.
   * @param props
   */
  constructor(props) {
    super(props);
    /**
     * product - the product to be displayed by this component.
     */
    this.state = {
      product: undefined
    };
  }

  /**
   * After mounting, this function calls the
   * {@link ProductService#getSingleProduct} function, updating this component's
   * state with the backend server response.
   */
  componentDidMount() {
    const {id} = this.props.match.params;
    ProductService.getSingleProduct(id).then(response => {
      this.setState({ product: response.data });
    });
  }

  /**
   * Calls the {@link ProductService#deleteProduct} function to instruct the
   * backend to delete the product by the given ID from the database, then
   * routes the user to the homepage.
   * @param id of the product to be deleted
   */
  delete(id){
    ProductService.deleteProduct(id).then(result => {
      this.props.history.push("/home")
    });
  }

  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
  render() {
    const {product} = this.state;
    return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Product Details
              </h3>
            </div>
            <div className="panel-body">
              <h4>
                <Link to="/">
                  <span className="glyphicon glyphicon-th-list" aria-hidden="true"/>
                  Products List
                </Link>
              </h4>
              {product &&
              <div>
                <dl>
                  <dt>Name:</dt>
                  <dd>{product.name}</dd>
                  <dt>ShortDescription:</dt>
                  <dd>{product.shortDescription}</dd>
                  <dt>LongDescription:</dt>
                  <dd>{product.longDescription}</dd>
                  <dt>Price:</dt>
                  <dd>{product.price}</dd>
                  <dt>Quantity:</dt>
                  <dd>{product.quantity}</dd>
                </dl>
                < Link to={`/edit/${product.id}`} className="btn btn-success">
                  Edit
                </Link>
                <button onClick={this.delete.bind(this, product.id)} className="btn btn-danger">
                  Delete
                </button>
              </div>
              }
            </div>
          </div>
        </div>
    );
  }
}
export default Show;