import React from 'reactn';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import AddToCart from "../cart/AddToCart";
import ProductService from "../../services/ProductService"
import './ProductResult.css';
import ProductImage from './../img/empty-product-icon.png';
import UserService from "../../services/UserService";

/**
 * The product card viewed on results pages.
 * Contains the picture, name and price of the product.
 *
 */
class ProductResult extends React.PureComponent {
  /**
   * Constructs this component with an undefined initial state values. This
   * constructor also binds the {@link addToCart} function to this component.
   * @param props {string} - the prop should be a product ID
   *
   */
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.state = {}
  }

  /**
   * Calls the {@link UserService#addToCart} function, passing it the ID of the
   * product represented by this component and the quantity received from this
   * component's {@link AddToCart} child.
   */
  addToCart(quantity) {
    UserService.addToCart(this.props.id, quantity);
  }

  /**
   * After this component mounts, this function calls the
   * {@link ProductService#getSingleProduct} function to get the product details
   * associated with the product ID prop.
   */
  componentDidMount() {
    const {id} = this.props;
    ProductService.getSingleProduct(id).then(
       response => this.setState({...response.data}),
       error    => alert(error)
    )
  }

  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
  render() {
    const {id, name, shortDescription, price, image} = this.state;
    if (!name) { return null; }
    const img = (image==='') ? ProductImage : image;

    return (
        <li className="result">
          <span>
            <div className="product-image">
              <Link to={`/show/${id}`}>
                <img src={img} className="center" alt={"Missing"}/>
              </Link>
            </div>
            <div className="product-info">
              <h1 className="product-name">{name}</h1>
              <h1 className="product-price">${price.toFixed(2)}</h1>
            </div>
            <h2 className="product-short-description">{shortDescription}</h2>
            <AddToCart addToCart={this.addToCart} />
            <Link to={`/edit/${id}`}>
              <Button className='product-action-button' variant="outline-info" size="sm">Edit</Button>
            </Link>
          </span>
        </li>
    );
  }
}
export default ProductResult;
