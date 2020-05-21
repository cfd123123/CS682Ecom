import React from 'reactn';
import "./Cart.css"
import CartProductList from "./CartProductList";
import ProductService from "../../services/product.service";
import ProceedToCheckout from "./ProceedToCheckout";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";

export default class Cart extends React.PureComponent {

  constructor(props) {
    super(props);
    this.getCart = this.getCart.bind(this);
    this.proceedToCheckout = this.proceedToCheckout.bind(this);

    this.state = {
      content: "",
      products: undefined,
      total: undefined,
      count: undefined,
    }
  };

  // TODO: Make the proceedToCheckout API return an existing preOrder if it exists.
  proceedToCheckout() {
    const {loggedIn, currentUser} = this.global;
    const {total} = this.state;
    if (loggedIn) {
      UserService.proceedToCheckout(currentUser.cart, total).then(
          response => {
            this.props.history.push({
              pathname: '/checkout',
              state: { response: response.data },
            });
          },
          error => {
            console.log(error);
          }
      );
    } else {
      AuthService.logout();
      this.props.history.push("/login");
        window.location.reload();
    }
  }

  getCart() {
    const {cart} = this.global.currentUser;
    if (cart) {
      const justProducts = Object.entries(cart).map(([id, q]) => id);
      ProductService.getListOfProducts(justProducts).then(
          response => {
            // console.log(response);
            let total = 0.0;
            let count = 0;
            // let products = (response.data && response.data.products);
            let products = response.data;
            products.forEach(product => {
              total = total + (product.price * cart[product.id]);
              count = count + cart[product.id];
            });
            this.setState({
              // loggedIn: (response.data && response.data.loggedIn),
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
    const {currentUser, loggedIn} = this.global;
    if (!currentUser) { return null; }
    const {products, total, count} = this.state;
    if (!products) {
      this.getCart();
      return null;
    }

    return (
        <div className="app-fixed-right-grid-inner" style={{'margin':'1em 1em 1em 1em'}}>
          <div className="app-fixed-right-grid-col app-col-right" style={{'width': '300px', 'float': 'right'}}>
            <ProceedToCheckout loggedIn={loggedIn} total={total} count={count} proceedToCheckout={this.proceedToCheckout}/>
          </div>
          <CartProductList {...this.state} />
        </div>
    );
  }
}
