import React from 'reactn';
import "./Cart.css"
import CartProductList from "./CartProductList";
import ProductService from "../../services/ProductService";
import ProceedToCheckout from "./ProceedToCheckout";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";

/**
 * Top level component that is the user's shopping cart page. The current user
 * information is retrieved from the reactn {@link global} variable currentUser.
 */
class Cart extends React.PureComponent {
  /**
   * Constructs the shopping cart component with undefined members that will
   * be updated by the {@link getCart} function. Constructor also binds the
   * {@link getCart} and {@link proceedToCheckout} functions to this component.
   * @param props
   */
  constructor(props) {
    super(props);
    this.getCart = this.getCart.bind(this);
    this.proceedToCheckout = this.proceedToCheckout.bind(this);

    /**
     * content - holds async error if one occurs<br>
     * products - list of products in the cart<br>
     * total - the cart product subtotal<br>
     * count - the count of items in the cart
     */
    this.state = {
      content: "",
      products: undefined,
      total: undefined,
      count: undefined,
    }
  };

  /**
   * Calls the {@link UserService#proceedToCheckout} function which initiates
   * the checkout processes, then sends the user to a page where they must
   * confirm their order details. If the user is not logged in, this function
   * will instead send them to the {@link Login} page.<br>
   *
   * The response from the backend is passed as a prop to the {@link Checkout}
   * component.
   * @async
   */
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

  /**
   * Calls the {@link ProductService#getListOfProducts} function, passing it
   * the list of product IDs corresponding to the products in the user's cart.
   * The function then updates this component's state with more detailed product
   * information that is displayed to the user.
   */
  getCart() {
    const {cart} = this.global.currentUser;
    if (cart) {
      // create a list of product IDs to pass to the backend
      const justProducts = Object.entries(cart).map(([id, q]) => id);
      ProductService.getListOfProducts(justProducts).then(
          response => {
            let products = response.data;
            let total = 0.0;
            let count = 0;
            // sum up the count and total
            products.forEach(product => {
              total = total + (product.price * cart[product.id]);
              count = count + cart[product.id];
            });
            this.setState({
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

  /**
   * Renders this component
   * @returns {ReactElement} The React element used to render a DOM node
   */
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
export default Cart;