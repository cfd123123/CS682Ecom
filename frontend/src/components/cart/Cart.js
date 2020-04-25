import React, { Component } from 'react';
import {CurrentUserContext} from "../../CurrentUserContext";
import "./Cart.css"
import CartProductList from "./CartProductList";
import ProductService from "../../services/product.service";
import ProceedToCheckout from "./ProceedToCheckout";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";

export default class Cart extends Component {

  constructor(props) {
    super(props);
    this.getCart = this.getCart.bind(this);
    this.proceedToCheckout = this.proceedToCheckout.bind(this);
    this.logOut = this.logOut.bind(this);

    this.state = {
      content: "",
      loggedIn: false,
      products: undefined,
      total: undefined,
      count: undefined,
    }
  };

  componentDidMount() {
    this.getCart();
  }
  proceedToCheckout() {
    const {currentUser} = this.context;
    const {loggedIn, total} = this.state;
    if (loggedIn) {
      // alert("Proceeding to checkout");
      // console.log(currentUser.cart);
      UserService.proceedToCheckout(currentUser.cart, total).then(
          response => {
            this.props.history.push({
              pathname: '/checkout',
              state: { response: response.data },
            });
            // window.location.reload();
          },
          error => {
            console.log(error);
          }
      );
      // alert("checking out");
    } else {
      this.logOut();
      this.props.history.push("/login");
        window.location.reload();
    }
  }

  logOut() {
    AuthService.logout();
  }

  getCart() {
    const {currentUser} = this.context;
    if (currentUser) {
      const justProducts = Object.entries(currentUser.cart).map(([id, q]) => id);
      ProductService.getListOfProducts(justProducts).then(
          response => {
            let total = 0.0;
            let count = 0;
            let products = (response.data && response.data.products);
            products.forEach(product => {
              total = total + (product.price * currentUser.cart[product.id]);
              count = count + currentUser.cart[product.id];
            });
            this.setState({
              loggedIn: (response.data && response.data.loggedIn),
              products: products,
              total: total,
              count: count,
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
    const {products, total, count, loggedIn} = this.state;
    if (!products) {
      this.getCart();
      return null;
    }
    // TODO: Find a way to break an infinite loop if products never gets defined

    return (
        <div className="app-fixed-right-grid-inner">
          <div className="app-fixed-right-grid-col app-col-right" style={{'width': '300px', 'float': 'right'}}>
            <ProceedToCheckout loggedIn={loggedIn} total={total} count={count} proceedToCheckout={this.proceedToCheckout}/>
          </div>
          <CartProductList {...this.state} />
        </div>
    );
  }
}
Cart.contextType = CurrentUserContext;