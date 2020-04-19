import React from 'react';
// import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import UserService from "../../services/user.service";
import ProductService from "../../services/product.service";

import '../product/ProductRow.css';
import './../cart/Cart.css'
import ProductImage from './../img/empty-product-icon.png';

class CartProductRow extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      productID: this.props.productID,
      name: '',
      shortDescription: '',
      price: undefined,
      quantity: this.props.quantity,
      content: "",
      loaded: false
    };
  }
  componentDidMount() {
    this._isMounted = true;
    ProductService.getSingleProduct(this.state.productID).then(
        response => {
          if (this._isMounted) {
            this.setState({
              content: JSON.stringify(response.data),
              name: response.data.name,
              shortDescription: response.data.shortDescription,
              price: response.data.price,
              loaded: true
            });
          }
        },
        error => {
          if (this._isMounted) {
            this.setState({
              requireLogin: true,
              content: (error.response && error.response.data &&
                  error.response.data.message) || error.message || error.toString()
            });
          }
        }
    );
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {productID, name, price, loaded} = this.state;

    const addToCart = () => {
      UserService.addToCart(productID, 1).then(
          response => {
            console.log(response);
            alert("Item added to cart: " + response.data);
          },
          error => {
            console.log(error && error.response);
            alert("error adding to cart: " + error);
          }
      )
    };

    return (
        <div className="app-row cart-item">
          {loaded &&
          <div className="app-row cart-list-item cart-list-item-border">
            <div className="app-row app-spacing-base app-spacing-top-base">
              <div className="app-column app-span85">
                <div className="app-fixed-left-grid">
                  <div className="app-fixed-left-grid-inner" style={{ 'paddingLeft': '190px' }}>
                    <div className="app-fixed-left-grid-col app-float-left cart-product-image app-col-left">
                      <Link to={`/show/${productID}`}>
                        <img src={ProductImage} className="center" alt={"missingID"}/>
                      </Link>
                    </div>
                    <div className="app-fixed-left-grid-col app-col-right cart-product-info">
                      <ul className="app-unordered-list app-nostyle app-vertical app-spacing-mini">
                        <li>
                          <span className="app-list-item">
                            <a href={`/show/${productID}`} className="app-link-normal cart-product-link">
                              <span className="app-size-medium cart-product-title">
                                {name}
                              </span>
                            </a>
                          </span>
                        </li>
                        {/*<li><span><a><span></span></a></span></li>*/}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="app-column app-span15 app-text-right app-span-last">
                <p className="app-spacing-small">
                  <span className="app-size-medium app-color-price cart-price cart-white-space-nowrap cart-product-price cart-price-sign app-text-bold">
                    ${price.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
          }
        </div>
    );
  }
}

export default CartProductRow;
