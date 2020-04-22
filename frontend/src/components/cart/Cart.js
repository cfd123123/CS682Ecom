import React, { Component } from 'react';
import ProductService from "../../services/product.service";
import CartProductRow from "./CartProductRow";
import "./Cart.css"
import {CurrentUserContext} from "../../CurrentUserContext";

export default class Cart extends Component {

  constructor(props) {
    super(props);
    this.getCart = this.getCart.bind(this);

    this.state = {
      content: "",
      products: undefined
    };
  }

  componentDidMount() {
    this.getCart();
  }


  getCart() {
    const {currentUser} = this.context;
    if (currentUser) {
      const justProducts = Object.entries(currentUser.cart).map(([id, q]) => id);
      ProductService.getListOfProducts(justProducts).then(
          response => {
            this.setState({
              products: response.data
            });
          },
          error => {
            this.setState({
              content: (error.response && error.response.data) ||
                  error.message ||
                  error.toString()
            });
          }
      );
    }
  }

  render() {
    const {currentUser} = this.context;
    if (!currentUser) { return null; }
    if (!this.state.products) {
      this.getCart();
      return null;
    }

    const { products } = this.state;
    let total = 0.00;
    let count = 0;
    const cartList = products.map(product => {
      total = total + (product.price * currentUser.cart[product.id]);
      count = count + (currentUser.cart[product.id]);
      return <CartProductRow key={`${product.id}`} {...product} quantity={currentUser.cart[product.id]}/>
    }
    );
    // console.log(total);
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
Cart.contextType = CurrentUserContext;