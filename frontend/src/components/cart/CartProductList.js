import React, { Component } from 'react';
import {CurrentUserContext} from "../../CurrentUserContext";
import CartProductRow from "./CartProductRow";
import "./Cart.css"

export default class CartProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      ...this.props,
    };
  }

  render() {
    const {currentUser} = this.context;
    const {products, total, count} = this.state;

    const cartList = products.map(product => {
          return <CartProductRow key={`${product.id}`} {...product} quantity={currentUser.cart[product.id]}/>
        }
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
                Subtotal ({count}{" "}items):{" "}
              </span>
              <span id="cart-subtotal-amount-activecart" className="app-color-price cart-price-container app-text-bold">
                <span className="app-size-medium app-color-price cart-price cart-white-space-nowrap cart-price-sign">
                  ${total.toFixed(2)}
                </span>
              </span>
            </div>
          </form>
        </div>
    );
  }
}
CartProductList.contextType = CurrentUserContext;