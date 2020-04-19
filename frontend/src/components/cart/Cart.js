import React, { Component } from 'react';
import UserService from "../../services/user.service";
import CartProductRow from "./CartProductRow";
import "./Cart.css"

class Cart extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      content: "",
      products: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    UserService.getProfile().then(
        response => {
          if (this._isMounted) {
            console.log(response.data);
            this.setState({
              products: response.data.cart
            });
          }
        },
        error => {
          if (this._isMounted) {
            this.setState({
              content:
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString()
            });
          }
        }
    );
}

  render() {
    const { products } = this.state;
    const cartList = Object.entries(products).map(([productID,quantity]) =>
          <CartProductRow key={productID} productID={productID} quantity={quantity}/>
    );
    return (
        <div id="active-cart" className="app-section app-spacing-top-base cart-list">
          <div className="app-row cart-cart-header cart-compact-bottom">
            <div className="app-row">
              <h2>Shopping Cart</h2>
            </div>
          </div>
          <form id="cartForm">
            <div className="cart-list-header">
              <div className="app-row">
                <div className="app-column app-span85" />
                  <div className="app-column app-span15 app-text-right app-spacing-top-micro app-span-last">
                    <span className="app-color-secondary">
                      Price
                    </span>
                  </div>
              </div>
            </div>
            <div className="app-row app-spacing-mini cart-list-body active-items">
              {cartList}
            </div>
            <div className="app-row app-spacing-mini cart-subtotal">
              <span id="cart-subtotal-label-activecart" className="app-size-medium cart-number-of-items">
                Subtotal ({"X"} items):{" "}
              </span>
              <span id="cart-subtotal-amount-activecart" className="app-color-price cart-price-container app-text-bold">
                <span className="app-size-medium app-color-price cart-price cart-white-space-nowrap cart-price-sign">
                  {"$X.XX"}
                </span>
              </span>
            </div>
          </form>
        </div>
    );
  }
}

export default Cart;